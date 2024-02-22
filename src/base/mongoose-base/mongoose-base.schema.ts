import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
@ObjectType()
export class MongooseBaseSchema {
  @Field(() => String)
  _id!: Schema.Types.ObjectId;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop({ default: null })
  deletedAt?: Date;
}
