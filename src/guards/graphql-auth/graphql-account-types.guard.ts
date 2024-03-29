import { EAccountType } from '@common/enums/account-type.enum';
import { GRAPHQL_ACCOUNT_TYPE } from '@decorators/auth/graphql-account-type.decorator';

import { RequesterDTO } from '@decorators/auth/requester.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphqlAccountTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const accountTypes: any = this.reflector.get<EAccountType>(
      GRAPHQL_ACCOUNT_TYPE,
      context.getHandler(),
    );
    if (!accountTypes) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);

    const requester = gqlContext.getContext().requester as RequesterDTO;

    return accountTypes.includes(requester.payload.type);
  }
}
