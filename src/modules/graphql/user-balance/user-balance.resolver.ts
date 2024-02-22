import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  AdminGrantingMoneyToUserInput,
  UserBalanceData,
} from './user-balance.schema';
import { UserBalanceService } from './user-balance.service';

@Resolver(UserBalanceData)
export class UserBalanceResolver {
  constructor(private readonly userBalanceService: UserBalanceService) {}

  // @Mutation(() => AdminGrantingMoneyToUserInput)
  // async adminGrantingMoneyToUser(
  //   @Args(AdminGrantingMoneyToUserInput.name)
  //   adminGrantingMoneyToUserInput: AdminGrantingMoneyToUserInput,
  // ): Promise<UserBalanceData> {
  //   return await this.userBalanceService.adminGrantingMoneyToUser(
  //     adminGrantingMoneyToUserInput,
  //   );
  // }
}
