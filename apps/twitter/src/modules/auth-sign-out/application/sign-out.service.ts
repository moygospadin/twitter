import { Injectable } from '@nestjs/common';

import { RefreshTokenDomain } from '../../auth-refresh-token/domain';
import { SessionDomain } from '../../auth-session/domain';

import { SignOutFromAllSessionsParameters, SignOutParameters } from './sign-out.service-type';

@Injectable()
export class SignOutService {
  constructor(private readonly refreshTokenDomain: RefreshTokenDomain, private readonly sessionDomain: SessionDomain) {}

  public async signOut({ currentUser, refreshToken }: SignOutParameters) {
    const { sessionId } = currentUser;

    await this.sessionDomain.deleteSessionById({ sessionId });
    await this.refreshTokenDomain.deleteRefreshToken({ refreshToken });
  }

  public async signOutFromAllDevices({ currentUser }: SignOutFromAllSessionsParameters) {
    const { userId } = currentUser;

    await this.sessionDomain.deleteAllUserSessions({ userId });
    await this.refreshTokenDomain.deleteAllUserRefreshTokens({ userId });
  }
}
