import { EAccountType } from '@common/enums/accountType.enum';

export interface IAccessToken {
  id: string;
  type: EAccountType;
  [key: string]: any;
}
