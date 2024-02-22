import { Module } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModel, AdminModelFactory } from './admin.model';
import { AuthService } from '@modules/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminModel.name, schema: AdminModelFactory },
    ]),
  ],
  providers: [
    AdminResolver,
    AdminService,
    AuthService,
    AdminRepository,
    { provide: AdminRepository.name, useClass: AdminRepository },
  ],
  exports: [],
})
export class AdminModule {}
