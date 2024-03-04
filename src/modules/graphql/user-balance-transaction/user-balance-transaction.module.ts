import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserBalanceTransactionModel,
  UserBalanceTransactionModelFactory,
} from './user-balance-transaction.model';
import { UserBalanceTransactionRepository } from './user-balance-transaction.repository';
import { UserBalanceTransactionResolver } from './user-balance-transaction.resolver';
import { UserBalanceTransactionService } from './user-balance-transaction.service';
import { UserRepository } from '../user/user.repository';
import { UserModel, UserModelFactory } from '../user/user.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserBalanceTransactionModel.name, schema: UserBalanceTransactionModelFactory },
      { name: UserModel.name, schema: UserModelFactory },
    ]),
  ],
  providers: [
    UserBalanceTransactionResolver,
    UserBalanceTransactionService,
    UserBalanceTransactionRepository,
    UserRepository,
    { provide: UserBalanceTransactionRepository.name, useClass: UserBalanceTransactionRepository },
  ],
  exports: [UserBalanceTransactionService],
})
export class UserBalanceTransactionModule {}
