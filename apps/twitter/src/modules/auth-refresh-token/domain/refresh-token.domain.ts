import { Inject, Injectable } from '@nestjs/common';

import { TimeService } from '@libs/time';

import { REFRESH_TOKEN_REPOSITORY_TOKEN } from '../core/tokens';

import {
  CreateRefreshTokenParameters,
  DeleteAllUserRefreshTokensParameters,
  DeleteOldestRefreshTokenParameters,
  DeleteRefreshTokenParameters,
  GetRefreshTokenParameters,
  IsRefreshTokenExpiredParameters,
} from './refresh-token.domain-type';
import { RefreshTokenRepositoryInterface } from './repository-interfaces';

@Injectable()
export class RefreshTokenDomain {
  private readonly refreshTokenLifetimeInMilliseconds = 60 * 60 * 1000;

  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY_TOKEN)
    private readonly refreshTokenRepository: RefreshTokenRepositoryInterface,
    private readonly timeService: TimeService,
  ) {}

  public async createRefreshToken({ userId }: CreateRefreshTokenParameters) {
    const createdAt = new Date();
    const expiredAt = this.timeService.addMilliseconds(createdAt, this.refreshTokenLifetimeInMilliseconds);
    const { id: refreshToken } = await this.refreshTokenRepository.add({ createdAt, expiredAt, userId });

    return { refreshToken };
  }

  public async deleteAllUserRefreshTokens({ userId }: DeleteAllUserRefreshTokensParameters) {
    await this.refreshTokenRepository.deleteByUserId({ userId });
  }

  public async deleteOldestRefreshToken({ userId }: DeleteOldestRefreshTokenParameters) {
    await this.refreshTokenRepository.deleteOldestRefreshToken({ userId });
  }

  public async deleteRefreshToken({ refreshToken }: DeleteRefreshTokenParameters) {
    await this.refreshTokenRepository.deleteById({ refreshTokenId: refreshToken });
  }

  public async getRefreshToken({ refreshToken }: GetRefreshTokenParameters) {
    return this.refreshTokenRepository.findById({ refreshTokenId: refreshToken });
  }

  public isRefreshTokenExpired({ expiredAt }: IsRefreshTokenExpiredParameters): boolean {
    return this.timeService.isBefore(expiredAt, new Date());
  }
}
