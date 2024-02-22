import { Prop } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

class MongooseBaseModel {
  _id!: MongooseSchema.Types.ObjectId;

  createdAt!: Date;

  updatedAt?: Date;

  @Prop({ default: null })
  deletedAt?: Date;
}

export { MongooseSchema, MongooseBaseModel };
