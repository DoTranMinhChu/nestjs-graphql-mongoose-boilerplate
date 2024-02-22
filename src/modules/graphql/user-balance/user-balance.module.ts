import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserBalanceModel,
  UserBalanceModelFactory,
} from './user-balance.model';
import { UserBalanceRepository } from './user-balance.repository';
import { UserBalanceResolver } from './user-balance.resolver';
import { UserBalanceService } from './user-balance.service';
import { UserRepository } from '../user/user.repository';
import { UserModel, UserModelFactory } from '../user/user.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserBalanceModel.name, schema: UserBalanceModelFactory },
    ]),
  ],
  providers: [
    UserBalanceResolver,
    UserBalanceService,
    UserBalanceRepository,
    { provide: UserBalanceRepository.name, useClass: UserBalanceRepository },
  ],
  exports: [UserBalanceService],
})
export class UserBalanceModule {}
