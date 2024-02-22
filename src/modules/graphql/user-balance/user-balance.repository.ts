import { MongooseBaseRepository } from '@base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserBalanceModel } from './user-balance.model';

@Injectable()
export class UserBalanceRepository extends MongooseBaseRepository<UserBalanceModel> {
  constructor(
    @InjectModel(UserBalanceModel.name)
    private readonly userBalanceModel: Model<UserBalanceModel>,
  ) {
    super(userBalanceModel);
  }
}
