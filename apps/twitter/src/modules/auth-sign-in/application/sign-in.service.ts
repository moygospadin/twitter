import { Injectable } from '@nestjs/common';

import { HashService } from '@libs/crypto';
import { BadRequestException, NotFoundException } from '@libs/exceptions';

import { RefreshTokenDomain } from '../../auth-refresh-token/domain';
import { SessionDomain } from '../../auth-session/domain';
import { UserDomain } from '../../user/domain';

import { SignInParameters } from './sign-in.service-type';

@Injectable()
export class SignInService {
  private signInErrorContext = 'Sign in';

  constructor(
    private readonly hashService: HashService,
    private readonly refreshTokenDomain: RefreshTokenDomain,
    private readonly sessionDomain: SessionDomain,
    private readonly userDomain: UserDomain,
  ) {}

  public async signIn({ email, password, userPrivacyInfo }: SignInParameters) {
    const user = await this.userDomain.getUserByEmail({ email });

    if (!user) {
      throw new NotFoundException(this.signInErrorContext, 'User not found');
    }

    const { id: userId, password: hashedPassword } = user;

    const isPasswordMatch = await this.hashService.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      throw new BadRequestException(this.signInErrorContext, 'Password did not match');
    }

    const isSessionsActiveCountExceeded = await this.sessionDomain.isSessionsActiveCountExceeded({ userId });

    if (isSessionsActiveCountExceeded) {
      await this.sessionDomain.deleteOldestUserSession({ userId });
      await this.refreshTokenDomain.deleteOldestRefreshToken({ userId });
    }

    const { refreshToken } = await this.refreshTokenDomain.createRefreshToken({ userId });
    const { sessionId } = await this.sessionDomain.createSession({ userId, userPrivacyInfo });

    return { refreshToken, sessionId };
  }
}
