import { IAccessToken } from '@common/interfaces/auth/accessToken.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  generateToken(payload: IAccessToken): string {
    return jwt.sign(payload, this.configService.get('server.secret') || '', {
      expiresIn: '30d',
    });
  }

  decodeToken(token: string) {
    return jwt.verify(token, this.configService.get('server.secret') || '');
  }
}
