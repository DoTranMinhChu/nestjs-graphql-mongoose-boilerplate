import { EAccountType } from '@common/enums/account-type.enum';
import { AdminData } from '@modules/graphql/admin';
import { UserData } from '@modules/graphql/user';
import {
  ContextType,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import mongoose from 'mongoose';
export interface RequesterDTO {
  payload: {
    id: string;
    type: EAccountType;
  };
  getUser: () => Promise<
    | (mongoose.Document<unknown, {}, UserData> &
        UserData &
        Required<{
          _id: mongoose.Schema.Types.ObjectId;
        }>)
    | null
  >;
  isUser: Boolean;
  getAdmin: () => Promise<
    | (mongoose.Document<unknown, {}, AdminData> &
        AdminData &
        Required<{
          _id: mongoose.Schema.Types.ObjectId;
        }>)
    | null
  >;
  isAdmin: Boolean;
}
export const Requester = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    switch (context.getType() as ContextType | 'graphql') {
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().requester;
      default:
        const request = context.switchToHttp().getRequest();
        return request.requester;
    }
  },
);
