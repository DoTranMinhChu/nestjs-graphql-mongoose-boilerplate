import { Module } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema, AdminSchemaFactory } from './admin.schema';
import { AuthService } from '@modules/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminSchema.name, schema: AdminSchemaFactory },
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
