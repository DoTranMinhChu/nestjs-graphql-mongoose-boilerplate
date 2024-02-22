import { EAccountType } from '@common/enums/accountType.enum';
import { UserSchema } from '@modules/graphql/user';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import mongoose from 'mongoose';
export interface RequesterDTO {
  id: string;
  type: EAccountType;
  getUser: () => Promise<
    | (mongoose.Document<unknown, {}, UserSchema> &
        UserSchema &
        Required<{
          _id: mongoose.Schema.Types.ObjectId;
        }>)
    | null
  >;
}
export const Requester = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);
    return request.requester;
  },
);
