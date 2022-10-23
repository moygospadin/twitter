import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser, CurrentUserArgs, PrivacyInfo, PrivacyInfoArgs } from '@libs/auth';

import { CookieService } from '../../auth-core/application';
import { RefreshTokenService } from '../application';

import { RefreshTokenDto } from './dtos';
import { RefreshTokenResult } from './results';

@Resolver(() => RefreshTokenDto)
export class RefreshTokenResolver {
  constructor(private readonly cookieService: CookieService, private readonly refreshTokenService: RefreshTokenService) {}

  @Mutation(() => RefreshTokenResult, { description: 'Not protected' })
  public async refreshToken(
    @Context() { req, res }: GraphqlContext,
    @CurrentUserArgs() { sessionId }: CurrentUser,
    @PrivacyInfoArgs() { ip, userAgent }: PrivacyInfo,
  ): Promise<RefreshTokenResult> {
    const refreshToken = req.cookies.refreshToken;

    const { refreshToken: newRefreshToken, sessionId: newSessionId } = await this.refreshTokenService.refreshToken({
      refreshToken,
      sessionId,
      userPrivacyInfo: { ip, userAgent },
    });

    this.cookieService.setCookie(newSessionId, newRefreshToken, res);

    return { data: { refreshToken: newRefreshToken } };
  }
}
