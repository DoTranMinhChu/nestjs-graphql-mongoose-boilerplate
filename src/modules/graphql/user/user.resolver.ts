import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  LoginUserData,
  LoginUserInput,
  RegisterUserInput,
  UserSchema,
  UserSchemaPaginateData,
} from './user.schema';
import { UserService } from './user.service';
import { QueryGetListInput } from '../base/base-input.schema';
import { Requester, RequesterDTO } from '@decorators/auth/requester.decorator';
import { GraphqlAuthApi } from '@decorators/auth/graphqlAuth.decorator';

@Resolver(UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserSchemaPaginateData)
  async getAllUsers(
    @Args(QueryGetListInput.name) queryGetListInput: QueryGetListInput,
  ) {
    return await this.userService.fetch(queryGetListInput);
  }

  @Query(() => UserSchemaPaginateData)
  @GraphqlAuthApi()
  async getMyInformation(@Context('requester') requester: RequesterDTO) {
    console.log('requester ======> ', requester);
    
    return requester;
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
