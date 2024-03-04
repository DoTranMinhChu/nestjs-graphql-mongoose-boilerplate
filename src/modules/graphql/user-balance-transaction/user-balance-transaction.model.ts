import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EUserBalanceTransactionType } from './user-balance-transaction.enum';
import { MongooseBaseModel, MongooseSchema } from '@base';

export type UserBalanceTransactionDocument =
  HydratedDocument<UserBalanceTransactionModel>;

@Schema({
  timestamps: true,
  collection: 'user-balance-transaction',
})
export class UserBalanceTransactionModel extends MongooseBaseModel {
  @Prop({ type: Number })
  amount!: number;

  @Prop({ type: String, enum: EUserBalanceTransactionType, required: true })
  type!: EUserBalanceTransactionType;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user' })
  userId!: Types.ObjectId;
}
export const UserBalanceTransactionModelFactory = SchemaFactory.createForClass(
  UserBalanceTransactionModel,
);
UserBalanceTransactionModelFactory.index(
  { name: 'text' },
  { weights: { name: 1 } },
);
