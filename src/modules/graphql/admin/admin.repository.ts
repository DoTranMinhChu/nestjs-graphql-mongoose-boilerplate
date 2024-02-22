import { MongooseBaseRepository } from '@base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminSchema } from './admin.schema';

@Injectable()
export class AdminRepository extends MongooseBaseRepository<AdminSchema> {
  constructor(
    @InjectModel(AdminSchema.name)
    private readonly adminSchema: Model<AdminSchema>,
  ) {
    super(adminSchema);
  }
  async findByUsername(username: string) {
    return await this.adminSchema.findOne({ username });
  }
}
