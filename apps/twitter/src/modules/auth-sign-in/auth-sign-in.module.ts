import { Module } from '@nestjs/common';

import { AuthCoreModule } from '../auth-core';
import { AuthRefreshTokenModule } from '../auth-refresh-token';
import { AuthSessionModule } from '../auth-session';
import { UserModule } from '../user';

import { SignInService } from './application';
import { SignInResolver } from './presentation';

@Module({
  controllers: [],
  exports: [],
  imports: [AuthCoreModule, AuthRefreshTokenModule, AuthSessionModule, UserModule],
  providers: [SignInResolver, SignInService],
})
export class AuthSignInModule {}
