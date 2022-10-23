import { AwsService } from '@jebulday/aws';
import { Injectable } from '@nestjs/common';

import { HashService } from '@libs/crypto';

import { SessionDomain } from '../../auth-session/domain';
import { UserDomain } from '../../user/domain';
import { RepeatedPasswordNotMatchException } from '../core/exceptions';

import {
  ChangePasswordParameters,
  GetActiveSessionsParameters,
  UpdateAccountParameters,
  UpdateUserAvatar,
} from './user-account.service-type';

@Injectable()
export class UserAccountService {
  private readonly userAccountErrorContext = 'User account';

  constructor(
    private readonly awsService: AwsService,
    private readonly hashService: HashService,
    private readonly sessionDomain: SessionDomain,
    private readonly userDomain: UserDomain,
  ) {}

  public async changePassword({ currentUser, password, repeatPassword }: ChangePasswordParameters) {
    const { userId } = currentUser;

    if (password !== repeatPassword) {
      throw new RepeatedPasswordNotMatchException(this.userAccountErrorContext);
    }

    const hashedPassword = await this.hashService.hash(password);

    await this.userDomain.updateUserPasswordById({ password: hashedPassword, userId });
  }

  public async getActiveSessions({ currentUser }: GetActiveSessionsParameters) {
    const { userId } = currentUser;

    return this.sessionDomain.getAllUserSessions({ userId });
  }

  public async updateAccount({ currentUser, email, firstName, lastName, phoneNumber }: UpdateAccountParameters) {
    const { userId } = currentUser;

    return this.userDomain.updateUserById({ email, firstName, lastName, phoneNumber, userId });
  }

  public async updateAvatar({ avatar, currentUser }: UpdateUserAvatar) {
    const { userId } = currentUser;

    const file = await this.awsService.putFile({ file: avatar, name: userId, subPath: 'avatar/' });

    return this.userDomain.updateUserAvatar({ file, userId });
  }
}
