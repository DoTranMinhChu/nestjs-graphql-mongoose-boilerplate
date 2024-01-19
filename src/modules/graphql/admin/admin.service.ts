import { MongooseBaseService } from '@base';
import { AdminSchema } from './admin.schema';
import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { QueryGetListInput } from '../base/base-input.schema';

@Injectable()
export class AdminService extends MongooseBaseService<AdminSchema> {
  constructor(private readonly userRepository: AdminRepository) {
    super(userRepository);
  }
  
}
