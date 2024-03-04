import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  AdminGrantingMoneyToUserInput,
  UserBalanceTransactionData,
  UserBalanceTransactionPaginateData,
} from './user-balance-transaction.schema';
import { UserBalanceTransactionService } from './user-balance-transaction.service';
import { UserService } from '../user/user.service';
import {
  GraphqlAccountType,
  GraphqlAuthApi,
  Requester,
  RequesterDTO,
} from '@decorators';
import { EAccountType } from '@common/enums';
import { QueryGetListInput } from '../base';
import _ from 'lodash';
import { UserBalanceTransactionModel } from './user-balance-transaction.model';
import { FilterQuery } from 'mongoose';

@Resolver(UserBalanceTransactionData)
export class UserBalanceTransactionResolver {
  constructor(
    private readonly userBalanceTransactionService: UserBalanceTransactionService,
    private readonly userService: UserService,
  ) {}

  @Query(() => UserBalanceTransactionData)
  @GraphqlAuthApi()
  @GraphqlAccountType([EAccountType.ADMIN, EAccountType.USER])
  async getOneBalanceTransaction(
    @Args('_id', { type: () => String }) _id: string,
    @Requester() requester: RequesterDTO,
  ) {
    const queryGetOneInput: FilterQuery<UserBalanceTransactionModel> = {
      _id,
    };
    if (requester.isUser) {
      _.set(queryGetOneInput, 'userId', requester.payload.id);
    }
    return this.userBalanceTransactionService.findOne(queryGetOneInput);
  }

  @Query(() => UserBalanceTransactionPaginateData)
  @GraphqlAuthApi()
  async getAllUserBalanceTransaction(
    @Args(QueryGetListInput.name, { nullable: true })
    queryGetListInput: QueryGetListInput,
    @Requester() requester: RequesterDTO,
  ) {
    if (requester.isUser) {
      _.set(queryGetListInput, 'filter.userId', requester.payload.id);
    }
    return this.userBalanceTransactionService.fetch(queryGetListInput);
  }

  @Mutation(() => UserBalanceTransactionData)
  async adminGrantingMoneyToUser(
    @Args(AdminGrantingMoneyToUserInput.name)
    adminGrantingMoneyToUserInput: AdminGrantingMoneyToUserInput,
    @Requester() _requester: RequesterDTO,
  ): Promise<UserBalanceTransactionData> {
    return this.userBalanceTransactionService.adminGrantingMoneyToUser(
      adminGrantingMoneyToUserInput,
    );
  }

  @ResolveField()
  async user(@Parent() userBalanceTransactionData: UserBalanceTransactionData) {
    const { userId } = userBalanceTransactionData;
    return this.userService.findOneById(userId);
  }
}
