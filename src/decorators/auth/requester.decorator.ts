import { EAccountType } from '@common/enums/account-type.enum';
import { UserData } from '@modules/graphql/user';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import mongoose from 'mongoose';
export interface RequesterDTO {
  id: string;
  type: EAccountType;
  getUser: () => Promise<
    | (mongoose.Document<unknown, {}, UserData> &
        UserData &
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
