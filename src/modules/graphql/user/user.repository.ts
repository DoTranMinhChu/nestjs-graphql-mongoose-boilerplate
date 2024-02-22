import { MongooseBaseRepository } from '@base';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository extends MongooseBaseRepository<UserModel> {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {
    super(userModel);
  }
  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }
}
