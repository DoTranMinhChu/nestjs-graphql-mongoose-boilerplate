import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Mixed, PaginateDataSchema } from '../base';
import { MongooseBaseSchema } from '@base';
export type UserDocument = HydratedDocument<UserData>;
//===== Type =====
@ObjectType()
export class UserData extends MongooseBaseSchema {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  email?: string;

  password!: string;

  @Field(() => String)
  username!: string;

  @Field(() => Mixed, { nullable: true })
  totalBalance?: number;
}

@ObjectType()
export class LoginUserData {
  @Field(() => String)
  accessToken!: string;
}

@ObjectType()
export class UserPaginateData extends PaginateDataSchema(UserData) {}

//===== Input =====
@InputType()
export class RegisterUserInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;
}
