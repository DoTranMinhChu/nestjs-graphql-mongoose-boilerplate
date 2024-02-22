import { Global, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from '@modules/auth';
import { UserModel, UserModelFactory } from './user.model';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserModelFactory },
    ]),
  ],
  providers: [
    AuthService,
    UserResolver,
    UserService,
    UserRepository,
    { provide: UserRepository.name, useClass: UserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
