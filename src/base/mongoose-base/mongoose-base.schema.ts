import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
@ObjectType()
class MongooseBaseSchema {
  @Field(() => String)
  _id!: Types.ObjectId;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}

export { MongooseBaseSchema, MongooseSchema };
