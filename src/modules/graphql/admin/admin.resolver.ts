import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AdminSchema,
  AdminSchemaPaginateData,
  AdminLoginInput,
} from './admin.schema';
import { AdminService } from './admin.service';
import { QueryGetListInput } from '../base/base-input.schema';
import { AuthService } from '@modules/auth/auth.service';
import { AdminRepository } from './admin.repository';
import { NotFoundException } from '@nestjs/common';
import { EAccountType } from '@common/enums/accountType.enum';

@Resolver(AdminSchema)
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    private readonly adminRepository: AdminRepository,
  ) {}

  @Query(() => AdminSchemaPaginateData)
  async getAllAdmins(
    @Args(QueryGetListInput.name) queryGetListInput: QueryGetListInput,
  ) {
    return await this.adminService.fetch(queryGetListInput);
  }

  @Mutation(() => AdminSchema)
  async createAdmin(
    @Args(AdminLoginInput.name) adminLoginInput: AdminLoginInput,
  ) {
    const { password, username } = adminLoginInput;
    const admin = await this.adminRepository.findOneByCondition({
      username,
    });
    if (!admin) {
      throw new NotFoundException("User name doesn't existed");
    }
    const token = this.authService.generateToken({
      accountType: EAccountType.ADMIN,
      _id: admin._id,
    });

    return { token };
  }

  // @GraphqlAuthApi()
  // @GraphqlAccountType([EAccountType.USER])
  // @ResolveField()
  // async refreshTokens(@Parent() admin: Admin) {
  //   const { id } = admin;
  //   return { id };
  // }

  // @ResolveField()
  // dobFormatted(@Parent() admin: Admin) {
  //   return admin.dob?.toISOString().split('T')[0] || null;
  // }
}