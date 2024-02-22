import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AdminSchema,
  AdminSchemaPaginateData,
  LoginAdminInput,
  LoginAdminData,
} from './admin.schema';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { NotFoundException } from '@nestjs/common';
import { QueryGetListInput } from '../base';
import { IAccessToken } from '@common/interfaces';
import { AuthService } from '@modules/auth';
import { EAccountType } from '@common/enums';

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
    @Args(LoginAdminInput.name) adminLoginInput: LoginAdminInput,
  ) {
    const { password, username } = adminLoginInput;
    const admin = await this.adminRepository.findOneByCondition({
      username,
    });
    if (!admin) {
      throw new NotFoundException("User name doesn't existed");
    }
    const payload: IAccessToken = {
      type: EAccountType.ADMIN,
      id: admin.id,
    };
    const token = this.authService.generateToken(payload);

    return { token };
  }

  @Mutation(() => LoginAdminData)
  async loginAdmin(
    @Args(LoginAdminInput.name) loginAdminInput: LoginAdminInput,
  ): Promise<LoginAdminData> {
    return await this.adminService.loginAdmin(loginAdminInput);
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
