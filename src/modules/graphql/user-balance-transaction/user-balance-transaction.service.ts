import { MongooseBaseService } from '@base';
import { Injectable } from '@nestjs/common';
import { UserBalanceTransactionRepository } from './user-balance-transaction.repository';
import { UserBalanceTransactionModel } from './user-balance-transaction.model';
import { AdminGrantingMoneyToUserInput } from './user-balance-transaction.schema';
import { EUserBalanceTransactionType } from './user-balance-transaction.enum';
import { EXCEPTION } from '@exceptions/exception';
import { NotFoundException } from '@exceptions/not-found.exception';
import { Types } from 'mongoose';
import { UserRepository } from '../user';

@Injectable()
export class UserBalanceTransactionService extends MongooseBaseService<UserBalanceTransactionModel> {
  constructor(
    private readonly userBalanceTransactionRepository: UserBalanceTransactionRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(userBalanceTransactionRepository);
  }

  async adminGrantingMoneyToUser(
    adminGrantingMoneyToUserInput: AdminGrantingMoneyToUserInput,
  ) {
    const user = await this.userRepository.findOneById(
      adminGrantingMoneyToUserInput.userId,
    );
    if (!user) {
      throw new NotFoundException(EXCEPTION.USERNAME_DOES_NOT_EXIST);
    }
    adminGrantingMoneyToUserInput.type =
      EUserBalanceTransactionType.RECEIVE_FROM_ADMIN;
    adminGrantingMoneyToUserInput.amount = Math.abs(
      adminGrantingMoneyToUserInput.amount,
    );
    return this.userBalanceTransactionRepository.create(
      adminGrantingMoneyToUserInput,
    );
  }

  async sumTotalBalanceByUserId(userId: Types.ObjectId) {
    return this.userBalanceTransactionRepository.sumTotalBalanceByUserId(
      userId,
    );
  }
}
