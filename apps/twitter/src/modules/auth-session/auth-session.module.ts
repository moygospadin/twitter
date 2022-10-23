import { Module } from '@nestjs/common';

import { SESSION_REPOSITORY_TOKEN, USER_SESSION_REPOSITORY_TOKEN } from './core/tokens';
import { SessionDomain } from './domain';
import { SessionCacheRepository, UserSessionRepository } from './infrastructure';

@Module({
  controllers: [],
  exports: [SessionDomain],
  imports: [],
  providers: [
    { provide: SESSION_REPOSITORY_TOKEN, useClass: SessionCacheRepository },
    { provide: USER_SESSION_REPOSITORY_TOKEN, useClass: UserSessionRepository },
    SessionDomain,
  ],
})
export class AuthSessionModule {}
