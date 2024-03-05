import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@configs/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@guards/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AccountTypesGuard } from '@guards/auth/account-types.guard';
import { UserModule } from './user/user.module';
import { GraphqlAuthGuard } from '@guards/graphql-auth/graphql-auth.guard';
import { GraphqlAccountTypesGuard } from '@guards/graphql-auth/graphql-account-types.guard';
import { AdminModule } from './admin';
import { UserBalanceTransactionModule } from './user-balance-transaction';
import { GraphqlLoggingPlugin } from '@plugins';

@Module({
  imports: [
    AdminModule,
    UserModule,
    UserBalanceTransactionModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GraphqlAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GraphqlAccountTypesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccountTypesGuard,
    },
    GraphqlLoggingPlugin,
  ],
})
export class GraphqlModule implements NestModule {
  configure(_consumer: MiddlewareConsumer) {
    //   consumer
    //     .apply(QueryPrismaMiddleware)
    //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
