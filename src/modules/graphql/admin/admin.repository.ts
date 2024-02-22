import { MongooseBaseRepository } from '@base';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminModel } from './admin.model';

@Injectable()
export class AdminRepository extends MongooseBaseRepository<AdminModel> {
  constructor(
    @InjectModel(AdminModel.name)
    private readonly AdminData: Model<AdminModel>,
  ) {
    super(AdminData);
  }
  async findByUsername(username: string) {
    return await this.AdminData.findOne({ username });
  }
}
