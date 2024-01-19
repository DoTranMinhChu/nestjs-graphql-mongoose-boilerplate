import { MongooseBaseService } from '@base';
import {
  LoginUserData,
  LoginUserInput,
  RegisterUserInput,
  UserSchema,
} from './user.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EXCEPTION } from '@exceptions/exception';
import { BcryptUtil } from '@utils/bcrypt.util';
import { IAccessToken } from '@common/interfaces/auth/accessToken.interface';
import { EAccountType } from '@common/enums/accountType.enum';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class UserService extends MongooseBaseService<UserSchema> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super(userRepository);
  }
  async userRegister(
    registerRequest: RegisterUserInput,
  ): Promise<LoginUserData> {
    const { password } = registerRequest;
    const existedUser = await this.userRepository.findByUsername(
      registerRequest.username,
    );

    if (existedUser) {
      throw new BadRequestException(EXCEPTION.USERNAME_ALREADY_REGISTERED);
    }
    registerRequest.password = await BcryptUtil.hashData(password);
    await this.userRepository.create(registerRequest);

    return await this.userLogin(Object.assign(registerRequest, { password }));
  }

  async userLogin(loginUserInput: LoginUserInput): Promise<LoginUserData> {
    const { username, password } = loginUserInput;
    if (!username || !password) {
      throw new BadRequestException();
    }
    let user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException(EXCEPTION.USERNAME_DOES_NOT_EXIST);
    }

    if (!(await BcryptUtil.compareDataWithHash(password, user.password))) {
      throw new NotFoundException(EXCEPTION.PASSWORD_OR_USERNAME_INCORRECT);
    }
    const accessTokenPayload: IAccessToken = {
      id: user.id,
      type: EAccountType.USER,
    };

    return {
      accessToken: this.authService.generateToken(accessTokenPayload),
    };
  }
}
