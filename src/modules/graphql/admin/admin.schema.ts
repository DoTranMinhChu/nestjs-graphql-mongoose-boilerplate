import { MongooseBaseSchema } from '@base';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PaginateDataSchema } from '../base';
export type AdminDocument = HydratedDocument<AdminSchema>;
@ObjectType()
@Schema({
  timestamps: true,
  collection: 'admin',
})
export class AdminSchema extends MongooseBaseSchema {
  @Field(() => String)
  @Prop({ text: true })
  username!: string;

  @Field(() => String)
  @Prop({ text: true })
  name!: string;

  @Field(() => String)
  @Prop({ unique: true })
  email!: string;

  @Field(() => String)
  @Prop()
  password!: string;
}
export const AdminSchemaFactory = SchemaFactory.createForClass(AdminSchema);
AdminSchemaFactory.index({ name: 'text' }, { weights: { name: 1 } });

//===== Input =====
@InputType()
export class AdminLoginInput {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;
}
//===== Type =====
@ObjectType()
export class AdminSchemaPaginateData extends PaginateDataSchema(AdminSchema) {}
