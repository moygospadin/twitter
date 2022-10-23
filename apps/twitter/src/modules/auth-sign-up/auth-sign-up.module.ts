import { Module } from '@nestjs/common';

import { AuthCoreModule } from '../auth-core';
import { AuthRefreshTokenModule } from '../auth-refresh-token';
import { AuthSessionModule } from '../auth-session';
import { OutboundEeModule } from '../event-emitter/outbound';
import { UserModule } from '../user';

import { SignUpService } from './application';
import { SIGN_UP_VALIDATION_REPOSITORY_TOKEN } from './core/tokens';
import { SignUpDomain } from './domain';
import { SignUpValidationRepository } from './infrastructure';
import { SignUpResolver } from './presentation';

@Module({
  controllers: [],
  exports: [],
  imports: [AuthCoreModule, AuthRefreshTokenModule, AuthSessionModule, OutboundEeModule, UserModule],
  providers: [
    { provide: SIGN_UP_VALIDATION_REPOSITORY_TOKEN, useClass: SignUpValidationRepository },
    SignUpDomain,
    SignUpResolver,
    SignUpService,
  ],
})
export class AuthSignUpModule {}
