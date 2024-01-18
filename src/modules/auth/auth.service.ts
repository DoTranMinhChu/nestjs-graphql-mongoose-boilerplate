import { EAccountType } from '@common/enums/accountType.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
export interface IPayloadToken {
  pageId?: String;
  psid?: String;
  accountType: string;
  [name: string]: any;
}
@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  generateToken(payload: IPayloadToken): string {
    return jwt.sign(payload, this.configService.get('server.secret') || '', {
      expiresIn: '30d',
    });
  }

  decodeToken(token: string) {
    return jwt.verify(token, this.configService.get('server.secret') || '');
  }

  getAdministratorToken() {
    return this.generateToken({
      accountType: EAccountType.ADMIN,
    });
  }
  //   getCustomerToken(customer: ICustomer) {
  //     return this.generateToken({
  //       role: EAccountType.CUSTOMER,
  //       _id: customer._id,
  //       memberId: customer.memberId,
  //       username: customer.name,
  //       globalCustomerId: customer.globalCustomerId,
  //     });
  //   }
}
