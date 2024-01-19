import { EAccountType } from '@common/enums/accountType.enum';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export interface RequesterDTO {
  id: string;
  type: EAccountType;
}
export const Requester = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request)
    return request.requester;
  },
);
