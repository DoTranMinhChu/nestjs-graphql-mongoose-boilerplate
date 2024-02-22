import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
class MongooseBaseSchema {
  @Field(() => String)
  _id!: MongooseSchema.Types.ObjectId;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}

export { MongooseBaseSchema };
