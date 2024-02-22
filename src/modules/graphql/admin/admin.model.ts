import { MongooseBaseModel } from '@base';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<AdminModel>;

@Schema({
  timestamps: true,
  collection: 'admin',
})
export class AdminModel extends MongooseBaseModel {
  @Prop({ text: true })
  username!: string;

  @Prop({ text: true })
  name!: string;

  @Prop({ unique: true })
  email!: string;

  @Prop()
  password!: string;
}
export const AdminModelFactory = SchemaFactory.createForClass(AdminModel);
AdminModelFactory.index({ name: 'text' }, { weights: { name: 1 } });
