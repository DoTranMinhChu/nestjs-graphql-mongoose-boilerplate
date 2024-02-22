import { MongooseBaseSchema } from '@base';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PaginateDataSchema } from '../base';
export type UserDocument = HydratedDocument<UserSchema>;
@ObjectType()
@Schema({
  timestamps: true,
  collection: 'user',
})
export class UserSchema extends MongooseBaseSchema {
  @Field(() => String)
  @Prop({ text: true })
  name!: string;

  @Field(() => String, { nullable: true })
  @Prop({})
  email?: string;

  @Prop()
  password!: string;

  @Field(() => String)
  @Prop()
  username!: string;

  // @Field((_type: any) => [RefreshTokenUserSchema])
  // refreshTokens!: RefreshTokenUserSchema[];
}
export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
UserSchemaFactory.index({ name: 'text' }, { weights: { name: 1 } });

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
//===== Type =====
@ObjectType()
export class LoginUserData {
  @Field(() => String)
  accessToken!: string;
}

@ObjectType()
export class UserSchemaPaginateData extends PaginateDataSchema(UserSchema) {}
