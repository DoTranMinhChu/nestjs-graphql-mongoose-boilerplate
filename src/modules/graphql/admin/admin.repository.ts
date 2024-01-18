import { MongooseBaseRepository } from '@base';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminSchema } from './admin.schema';

@Injectable()
export class AdminRepository extends MongooseBaseRepository<AdminSchema> {
  constructor(
    @InjectModel(AdminSchema.name)
    private readonly adminRepository: Model<AdminSchema>,
  ) {
    super(adminRepository);
  }
}
