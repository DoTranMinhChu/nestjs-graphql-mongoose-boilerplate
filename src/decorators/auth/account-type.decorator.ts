import { EAccountType } from '@common/enums/account-type.enum';
import { SetMetadata } from '@nestjs/common';

export const ACCOUNT_TYPE = 'accountType';
export const AccountType = (accountTypes: EAccountType[]) => SetMetadata(ACCOUNT_TYPE, accountTypes);