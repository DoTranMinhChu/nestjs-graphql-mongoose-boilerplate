import { MongooseBaseSchema } from '@base';
import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { PaginateDataSchema } from '../base';
import { EUserBalanceTransactionType } from './user-balance-transaction.enum';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { UserData } from '../user/user.schema';
import { Types } from 'mongoose';

//===== Object Type====
@ObjectType()
export class UserBalanceTransactionData extends MongooseBaseSchema {
  @Field(() => Float)
  amount!: number;

  @Field(() => EUserBalanceTransactionType)
  type!: EUserBalanceTransactionType;

  @Field(() => String, { nullable: true })
  note?: string;

  @Field(() => String)
  userId!: Types.ObjectId;

  @Field(() => UserData, { nullable: true })
  user?: UserData;
}

@ObjectType()
export class UserBalanceTransactionPaginateData extends PaginateDataSchema(
  UserBalanceTransactionData,
) {}

//===== Input =====

@InputType()
export class AdminGrantingMoneyToUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  note!: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0, { message: 'Amount must be greater than or equal to 0' })
  amount!: number;

  type!: EUserBalanceTransactionType.RECEIVE_FROM_ADMIN;
}
