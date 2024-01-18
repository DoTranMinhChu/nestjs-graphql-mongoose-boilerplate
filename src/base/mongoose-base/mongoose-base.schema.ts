import { Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export class MongooseBaseSchema {
  @Field(() => String)
  _id!: Schema.Types.ObjectId;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Prop({ default: null })
  deletedAt?: Date;

  // _id?: string; // Sau này sẽ dùng với class-transformer để serialize dữ liệu response

  // @Prop({ default: null })
  // @Field(() => GraphQLISODateTime, { nullable: true })
  // deletedAt?: Date; // Dùng cho soft delete
}
