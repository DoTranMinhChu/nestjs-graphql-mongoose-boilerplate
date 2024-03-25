import { MongooseBaseRepository, MongooseSchema } from '@base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserBalanceTransactionModel } from './user-balance-transaction.model';

@Injectable()
export class UserBalanceTransactionRepository extends MongooseBaseRepository<UserBalanceTransactionModel> {
  constructor(
    @InjectModel(UserBalanceTransactionModel.name)
    private readonly userBalanceTransactionModel: Model<UserBalanceTransactionModel>,
  ) {
    super(userBalanceTransactionModel);
  }

  async sumTotalBalanceByUserId(userId: Types.ObjectId) {
    const userBalanceTransactionAggregateResult =
      await this.userBalanceTransactionModel.aggregate<{
        totalBalance: number;
      }>([
        {
          $match: {
            userId: new Types.ObjectId(userId.toString()),
          },
        },
        {
          $group: {
            _id: null,
            totalBalance: { $sum: '$amount' },
          },
        },
      ]);
    return (
      (userBalanceTransactionAggregateResult.length > 0
        ? userBalanceTransactionAggregateResult[0]?.totalBalance
        : 0) || 0
    );
  }
}
