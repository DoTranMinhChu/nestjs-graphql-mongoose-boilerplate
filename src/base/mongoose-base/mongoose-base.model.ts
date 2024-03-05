import { Prop } from '@nestjs/mongoose';
import {
  Schema as MongooseSchema,
  MongooseUpdateQueryOptions,
  Types,
} from 'mongoose';
import mongodb = require('mongodb');

interface MongooseUpdateOptions<T>
  extends mongodb.UpdateOptions,
    MongooseUpdateQueryOptions<T> {}
class MongooseBaseModel {
  _id!: Types.ObjectId;

  createdAt!: Date;

  updatedAt?: Date;

  @Prop({ default: null })
  deletedAt?: Date;
}

export { MongooseSchema, MongooseBaseModel, MongooseUpdateOptions };
