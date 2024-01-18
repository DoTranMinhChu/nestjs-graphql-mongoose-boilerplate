import { MongooseBaseService } from '@base';
import { UserSchema } from './user.schema';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { QueryGetListInput } from '../base/base-input.schema';

@Injectable()
export class UserService extends MongooseBaseService<UserSchema> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
  async fetch(query: QueryGetListInput) {
    return await this.userRepository.fetch(query);
  }
}
