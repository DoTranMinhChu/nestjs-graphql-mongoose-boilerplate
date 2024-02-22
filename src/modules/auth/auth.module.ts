import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [AuthService, ConfigService],
  exports: [],
})
export class AuthModule {}
