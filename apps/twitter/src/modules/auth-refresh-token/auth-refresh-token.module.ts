import { Module } from '@nestjs/common';

import { AuthCoreModule } from '../auth-core';
import { AuthSessionModule } from '../auth-session';

import { RefreshTokenService } from './application';
import { REFRESH_TOKEN_REPOSITORY_TOKEN } from './core/tokens';
import { RefreshTokenDomain } from './domain';
import { RefreshTokenRepository } from './infrastructure';
import { RefreshTokenResolver } from './presentation';

@Module({
  controllers: [],
  exports: [RefreshTokenDomain],
  imports: [AuthCoreModule, AuthSessionModule],
  providers: [
    { provide: REFRESH_TOKEN_REPOSITORY_TOKEN, useClass: RefreshTokenRepository },
    RefreshTokenDomain,
    RefreshTokenResolver,
    RefreshTokenService,
  ],
})
export class AuthRefreshTokenModule {}
