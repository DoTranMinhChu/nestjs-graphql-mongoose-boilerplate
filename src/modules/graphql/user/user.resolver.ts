import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  LoginUserData,
  LoginUserInput,
  RegisterUserInput,
  UserSchema,
  UserSchemaPaginateData,
} from './user.schema';
import { UserService } from './user.service';
import { QueryGetListInput } from '../base';
import { GraphqlAuthApi, RequesterDTO } from '@decorators';

@Resolver(UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserSchemaPaginateData)
  async getAllUsers(
    @Args(QueryGetListInput.name) queryGetListInput: QueryGetListInput,
  ) {
    return await this.userService.fetch(queryGetListInput);
  }

  @Query(() => UserSchema)
  @GraphqlAuthApi()
  async getOneUserById(@Args('_id', { type: () => String }) _id: string) {
    return this.userService.findOneById(_id);
  }

  @Query(() => UserSchema)
  @GraphqlAuthApi()
  async getMyInformation(@Context('requester') requester: RequesterDTO) {
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
