import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaFactory } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchemaFactory },
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    UserRepository,
    { provide: UserRepository.name, useClass: UserRepository },
  ],
  exports: [],
})
export class UserModule {}
