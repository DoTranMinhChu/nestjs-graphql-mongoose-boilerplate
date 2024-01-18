import { MongooseBaseSchema } from '@base';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
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

  @Field(() => String)
  @Prop({ unique: true })
  email!: string;

  @Field(() => String)
  @Prop()
  password!: string;

  @Field(() => String)
  @Prop()
  address!: string;

  // @Field((_type: any) => [RefreshTokenUserSchema])
  // refreshTokens!: RefreshTokenUserSchema[];
}
export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
UserSchemaFactory.index({ name: 'text' }, { weights: { name: 1 } });

//===== Input =====
@InputType()
export class CreateUserInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  address!: string;
}
//===== Type =====
@ObjectType()
export class UserSchemaPaginateData extends PaginateDataSchema(UserSchema) {}
