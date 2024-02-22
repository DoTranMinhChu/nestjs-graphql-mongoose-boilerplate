import { MongooseBaseService } from '@base';
import {
  LoginAdminData,
  LoginAdminInput,
  RegisterAdminInput,
} from './admin.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { EXCEPTION } from '@exceptions/exception';
import { BcryptUtil } from '@utils/bcrypt.util';
import { IAccessToken } from '@common/interfaces';
import { EAccountType } from '@common/enums';
import { AuthService } from '@modules/auth';
import { AdminModel } from './admin.model';

@Injectable()
export class AdminService extends MongooseBaseService<AdminModel> {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly authService: AuthService,
  ) {
    super(adminRepository);
  }
  async registerAdmin(
    registerRequest: RegisterAdminInput,
  ): Promise<LoginAdminData> {
    const { password } = registerRequest;
    const existedUser = await this.adminRepository.findByUsername(
      registerRequest.username,
    );

    if (existedUser) {
      throw new BadRequestException(EXCEPTION.USERNAME_ALREADY_REGISTERED);
    }
    registerRequest.password = await BcryptUtil.hashData(password);
    await this.adminRepository.create(registerRequest);

    return await this.loginAdmin(Object.assign(registerRequest, { password }));
  }
  async loginAdmin(
    loginAdminInput: LoginAdminInput,
  ): Promise<LoginAdminData> {
    const { username, password } = loginAdminInput;

    const isAdminListEmpty = !(await this.adminRepository.count());
    if (isAdminListEmpty) {
      await this.registerAdmin({
        name: 'Super Admin',
        password: '123123123',
        username: 'superadmin@gmail.com',
      });
    }

    if (!username || !password) {
      throw new BadRequestException();
    }

    let user = await this.adminRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException(EXCEPTION.USERNAME_DOES_NOT_EXIST);
    }

    if (!(await BcryptUtil.compareDataWithHash(password, user.password))) {
      throw new NotFoundException(EXCEPTION.PASSWORD_OR_USERNAME_INCORRECT);
    }
    const accessTokenPayload: IAccessToken = {
      id: user.id,
      type: EAccountType.ADMIN,
    };

    return {
      accessToken: this.authService.generateToken(accessTokenPayload),
    };
  }
}
