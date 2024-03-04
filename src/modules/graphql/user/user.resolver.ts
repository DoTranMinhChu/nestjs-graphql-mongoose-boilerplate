import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  LoginUserData,
  LoginUserInput,
  RegisterUserInput,
  UserData,
  UserPaginateData,
} from './user.schema';
import { UserService } from './user.service';
import { QueryGetListInput } from '../base';
import {
  GraphqlAccountType,
  GraphqlAuthApi,
  Requester,
  RequesterDTO,
} from '@decorators';
import { EAccountType } from '@common/enums';
import { UserBalanceTransactionService } from '../user-balance-transaction';

@Resolver(UserData)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userBalanceTransactionService: UserBalanceTransactionService,
  ) {}

  @Query(() => UserPaginateData)
  @GraphqlAuthApi()
  @GraphqlAccountType([EAccountType.ADMIN])
  async getAllUsers(
    @Args(QueryGetListInput.name, { nullable: true })
    queryGetListInput: QueryGetListInput,
  ) {
    return await this.userService.fetch(queryGetListInput);
  }

  @Query(() => UserData)
  @GraphqlAuthApi()
  async getOneUserById(@Args('_id', { type: () => String }) _id: string) {
    return this.userService.findOneById(_id);
  }

  @Query(() => UserData)
  @GraphqlAuthApi()
  async getMyInformation(@Requester() requester: RequesterDTO) {
    return requester.getUser();
  }

  @Mutation(() => LoginUserData)
  async registerUser(
    @Args(RegisterUserInput.name) registerUserInput: RegisterUserInput,
  ): Promise<LoginUserData> {
    return this.userService.userRegister(registerUserInput);
  }

  @Mutation(() => LoginUserData)
  async loginUser(
    @Args(LoginUserInput.name) loginUserInput: LoginUserInput,
  ): Promise<LoginUserData> {
    return this.userService.userLogin(loginUserInput);
  }

  @ResolveField()
  @GraphqlAuthApi()
  totalBalance(@Parent() user: UserData, @Requester() requester: RequesterDTO) {
    if (
      requester.isUser &&
      requester.payload.id.toString() != user._id.toString()
    ) {
      return null;
    }
    return this.userBalanceTransactionService.sumTotalBalanceByUserId(user._id);
  }
}
