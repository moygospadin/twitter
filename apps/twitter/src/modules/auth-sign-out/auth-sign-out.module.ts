import { Module } from '@nestjs/common';

import { AuthCoreModule } from '../auth-core';
import { AuthRefreshTokenModule } from '../auth-refresh-token';
import { AuthSessionModule } from '../auth-session';

import { SignOutService } from './application';
import { SignOutResolver } from './presentation';

@Module({
  controllers: [],
  exports: [],
  imports: [AuthCoreModule, AuthRefreshTokenModule, AuthSessionModule],
  providers: [SignOutResolver, SignOutService],
})
export class AuthSignOutModule {}
