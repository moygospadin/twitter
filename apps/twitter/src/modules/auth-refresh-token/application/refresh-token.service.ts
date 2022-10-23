import { Injectable } from '@nestjs/common';

import { NotFoundException } from '@libs/exceptions';

import { SessionDomain } from '../../auth-session/domain';
import { RefreshTokenExpiredException } from '../core/exceptions';
import { RefreshTokenDomain } from '../domain';

import { RefreshTokenParameters } from './refresh-token.service-type';

@Injectable()
export class RefreshTokenService {
  private readonly refreshTokenErrorContext = 'Refresh token';

  constructor(private readonly refreshTokenDomain: RefreshTokenDomain, private readonly sessionDomain: SessionDomain) {}

  public async refreshToken({ refreshToken, sessionId, userPrivacyInfo }: RefreshTokenParameters) {
    const refreshTokenData = await this.refreshTokenDomain.getRefreshToken({ refreshToken });

    if (!refreshTokenData) {
      throw new NotFoundException(this.refreshTokenErrorContext, 'Refresh token not found');
    }

    const isRefreshTokenExpired = await this.refreshTokenDomain.isRefreshTokenExpired(refreshTokenData);

    if (isRefreshTokenExpired) {
      throw new RefreshTokenExpiredException(this.refreshTokenErrorContext);
    }

    const { userId } = refreshTokenData;

    await this.refreshTokenDomain.deleteRefreshToken({ refreshToken });
    await this.sessionDomain.deleteSessionById({ sessionId });

    const { refreshToken: newRefreshToken } = await this.refreshTokenDomain.createRefreshToken({ userId });
    const { sessionId: newSessionId } = await this.sessionDomain.createSession({ userId, userPrivacyInfo });

    return { refreshToken: newRefreshToken, sessionId: newSessionId };
  }
}
