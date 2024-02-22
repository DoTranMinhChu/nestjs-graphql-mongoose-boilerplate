import { SetMetadata } from '@nestjs/common';

export const IS_GRAPHQL_AUTH_OR_UN_AUTH = 'isGraphqlAuthOrUnAuth';
export const GraphqlAuthOrUnauth = () =>
  SetMetadata(IS_GRAPHQL_AUTH_OR_UN_AUTH, true);
