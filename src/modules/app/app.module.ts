import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import configuration from '@configs/configuration';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphqlModule } from '@modules/graphql/graphql.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { AllExceptionsFilter } from '@filters';
import { AuthGuard, AccountTypesGuard } from '@guards';
import { FirebaseModule } from '@modules/firebase';
import { HttpLoggingMiddleware } from '@middlewares';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      fieldResolverEnhancers: ['guards', 'filters', 'interceptors'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    CacheModule.register({ isGlobal: true }),
    FirebaseModule,
    GraphqlModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get<string>('database.mongodb.mainUri') || '',
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),

    ServeStaticModule.forRoot({
      rootPath: join('./', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccountTypesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
