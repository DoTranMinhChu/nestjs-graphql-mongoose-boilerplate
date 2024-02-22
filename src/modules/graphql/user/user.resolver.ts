import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  LoginUserData,
  LoginUserInput,
  RegisterUserInput,
  UserSchema,
  UserSchemaPaginateData,
} from './user.schema';
import { UserService } from './user.service';
import { RequesterDTO } from '@decorators/auth/requester.decorator';
import { GraphqlAuthApi } from '@decorators/auth/graphqlAuth.decorator';
import { Inject, UseInterceptors } from '@nestjs/common';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { QueryGetListInput } from '../base';

@Resolver(UserSchema)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  @Query(() => UserSchemaPaginateData)
  async getAllUsers(
    @Args(QueryGetListInput.name) queryGetListInput: QueryGetListInput,
  ) {
    return await this.userService.fetch(queryGetListInput);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('getOneUserById')
  @CacheTTL(10000) // override TTL to 10 seconds
  @Query(() => UserSchema)
  @GraphqlAuthApi()
  async getOneUserById(@Args('_id', { type: () => String }) _id: string) {
    return this.userService.findOneById(_id);
  }

  @Query(() => UserSchema)
  @GraphqlAuthApi()
  async getMyInformation(@Context('requester') requester: RequesterDTO) {
    const data = await this.cacheService.get('me');

    return requester.getUser();
  }

  @Mutation(() => LoginUserData)
  async registerUser(
    @Args(RegisterUserInput.name) registerUserInput: RegisterUserInput,
  ): Promise<LoginUserData> {
    return await this.userService.userRegister(registerUserInput);
  }

  @Mutation(() => LoginUserData)
  async loginUser(
    @Args(LoginUserInput.name) loginUserInput: LoginUserInput,
  ): Promise<LoginUserData> {
    return await this.userService.userLogin(loginUserInput);
  }

  // @GraphqlAuthApi()
  // @GraphqlAccountType([EAccountType.USER])
  // @ResolveField()
  // async refreshTokens(@Parent() user: User) {
  //   const { id } = user;
  //   return { id };
  // }

  // @ResolveField()
  // dobFormatted(@Parent() user: User) {
  //   return user.dob?.toISOString().split('T')[0] || null;
  // }
}
