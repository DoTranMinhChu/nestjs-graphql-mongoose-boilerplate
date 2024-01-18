import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [FirebaseService, ConfigService],
  exports: [],
})
export class FirebaseModule {}
