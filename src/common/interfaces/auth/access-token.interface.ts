import { EAccountType } from '@common/enums/account-type.enum';

export interface IAccessToken {
  id: string;
  type: EAccountType;
  [key: string]: any;
}
