import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EUserBalanceType } from './user-balance.enum';
import { Field } from '@nestjs/graphql';
import { UserModel } from '../user/user.model';
import { MongooseBaseModel, MongooseSchema } from '@base';

export type UserBalanceDocument = HydratedDocument<UserBalanceModel>;

@Schema({
  timestamps: true,
  collection: 'user-balance',
})
export class UserBalanceModel extends MongooseBaseModel {
  amount!: number;

  @Field(() => EUserBalanceType)
  type!: EUserBalanceType;

  @Field(() => String, { nullable: true })
  note?: string;

  @Field(() => UserModel)
  userId!: MongooseSchema.Types.ObjectId;
}
export const UserBalanceModelFactory =
  SchemaFactory.createForClass(UserBalanceModel);
UserBalanceModelFactory.index({ name: 'text' }, { weights: { name: 1 } });
