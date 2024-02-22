import { MongooseBaseModel } from '@base/mongoose-base/mongoose-base.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'user',
})
export class UserModel extends MongooseBaseModel {
  @Prop({ text: true })
  name!: string;

  @Prop({})
  email?: string;

  @Prop()
  password!: string;

  @Prop()
  username!: string;

  // @Field((_type: any) => [RefreshTokenUserData])
  // refreshTokens!: RefreshTokenUserData[];
}
export const UserModelFactory = SchemaFactory.createForClass(UserModel);
UserModelFactory.index({ name: 'text' }, { weights: { name: 1 } });
