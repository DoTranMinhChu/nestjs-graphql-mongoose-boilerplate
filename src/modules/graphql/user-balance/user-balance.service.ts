import { MongooseBaseService } from '@base';
import { Injectable } from '@nestjs/common';
import { UserBalanceRepository } from './user-balance.repository';
import { UserBalanceModel } from './user-balance.model';
import { AdminGrantingMoneyToUserInput } from './user-balance.schema';
import { EUserBalanceType } from './user-balance.enum';
import { UserRepository } from '../user/user.repository';
import { EXCEPTION } from '@exceptions/exception';
import { NotFoundException } from '@exceptions/not-found.exception';

@Injectable()
export class UserBalanceService extends MongooseBaseService<UserBalanceModel> {
  constructor(
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(userBalanceRepository);
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
    adminGrantingMoneyToUserInput.type = EUserBalanceType.RECEIVE_FROM_ADMIN;
    adminGrantingMoneyToUserInput.amount = Math.abs(
      adminGrantingMoneyToUserInput.amount,
    );
    return this.userBalanceRepository.create(adminGrantingMoneyToUserInput);
  }
}
