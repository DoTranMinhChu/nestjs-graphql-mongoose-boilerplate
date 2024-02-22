import { MongooseBaseSchema, MongooseSchema } from '@base';
import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { PaginateDataSchema } from '../base';
import { EUserBalanceType } from './user-balance.enum';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { UserData } from '../user/user.schema';

//===== Object Type====
@ObjectType()
export class UserBalanceData extends MongooseBaseSchema {
  @Field(() => Float)
  amount!: number;

  @Field(() => EUserBalanceType)
  type!: EUserBalanceType;

  @Field(() => String, { nullable: true })
  note?: string;

  @Field(() => String)
  userId!: MongooseSchema.Types.ObjectId;

  @Field(() => UserData, { nullable: true })
  user?: UserData;
}

@ObjectType()
export class UserBalancePaginateData extends PaginateDataSchema(
  UserBalanceData,
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

  type!: EUserBalanceType.RECEIVE_FROM_ADMIN;
}
