import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_GRAPHQL_AUTH } from '@decorators/auth/graphqlAuth.decorator';
import { IS_GRAPHQL_AUTH_OR_UN_AUTH } from '@decorators/auth/graphqlAuthOrUnauth.decorator';
import { UserSchema, UserService } from '@modules/graphql/user';
import { IAccessToken } from '@common/interfaces/auth/accessToken.interface';
import { EAccountType } from '@common/enums/accountType.enum';
import mongoose from 'mongoose';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const isAuthApi = this.reflector.getAllAndOverride<boolean>(
      IS_GRAPHQL_AUTH,
      [gqlContext.getHandler(), gqlContext.getClass()],
    );

    const isContainToken = this.isContainToken(request);

    const isAuthOrUnAuthApi = this.reflector.getAllAndOverride<boolean>(
      IS_GRAPHQL_AUTH_OR_UN_AUTH,
      [gqlContext.getHandler(), gqlContext.getClass()],
    );

    if (!isAuthApi || (!isContainToken && isAuthOrUnAuthApi)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: IAccessToken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('server.secret') || 'secret',
      });
      // Assign the payload to the GraphQL context

      gqlContext.getContext().requester = this.makeupDataForRequester(payload);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
  private extractTokenFromHeader(request: any): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const bearerToken = authorizationHeader.substring(7); // Extract the token after 'Bearer '

      return bearerToken;
    }
    return undefined;
  }
  private isContainToken(request: any): any {
    return !!request?.headers?.authorization;
  }

  private makeupDataForRequester(payload: IAccessToken) {
    const requester: any = { payload };

    switch (requester.payload.type) {
      case EAccountType.USER: {
        requester.getUser = async () => {
          return await this.userService.findOneById(payload.id);
        };
        break;
      }
    }
    return requester;
  }
}
