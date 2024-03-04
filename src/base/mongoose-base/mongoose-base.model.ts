import { Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

class MongooseBaseModel {
  _id!: Types.ObjectId;

  createdAt!: Date;

  updatedAt?: Date;

  @Prop({ default: null })
  deletedAt?: Date;
}

export { MongooseSchema, MongooseBaseModel };
