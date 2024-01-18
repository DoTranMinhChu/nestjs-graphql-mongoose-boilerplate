import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateUserInput,
  UserSchema,
  UserSchemaPaginateData,
} from './user.schema';
import { UserService } from './user.service';
import { QueryGetListInput } from '../base/base-input.schema';

@Resolver(UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserSchemaPaginateData)
  async getAllUsers(
    @Args(QueryGetListInput.name) queryGetListInput: QueryGetListInput,
  ) {
    return await this.userService.fetch(queryGetListInput);
  }

  @Mutation(() => UserSchema)
  async createUser(
    @Args(CreateUserInput.name) createUserInput: CreateUserInput,
  ) {
    return await this.userService.create(createUserInput);
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
