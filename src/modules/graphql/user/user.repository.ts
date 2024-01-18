import { MongooseBaseRepository } from '@base';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from './user.schema';

@Injectable()
export class UserRepository extends MongooseBaseRepository<UserSchema> {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userRepository: Model<UserSchema>,
  ) {
    super(userRepository);
  }
}
