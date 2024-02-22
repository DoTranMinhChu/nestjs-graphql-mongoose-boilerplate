import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { PaginateDataSchema } from '../base';
import { MongooseBaseSchema } from '@base';
//===== Type =====

@ObjectType()
export class AdminData extends MongooseBaseSchema {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@ObjectType()
export class LoginAdminData {
  @Field(() => String)
  accessToken!: string;
}
@ObjectType()
export class AdminDataPaginateData extends PaginateDataSchema(AdminData) {}
//===== Input =====
@InputType()
export class RegisterAdminInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class LoginAdminInput {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;
}
