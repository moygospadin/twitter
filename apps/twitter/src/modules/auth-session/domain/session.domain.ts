import { Inject, Injectable } from '@nestjs/common';

import { TimeService } from '@libs/time';

import { SESSION_LIFETIME_IN_MILLISECONDS, SESSIONS_ACTIVE_COUNT } from '../core/constants';
import { SESSION_REPOSITORY_TOKEN, USER_SESSION_REPOSITORY_TOKEN } from '../core/tokens';

import { SessionCacheRepositoryInterface, UserSessionRepositoryInterface } from './repository-interfaces';
import {
  CreateSessionParameters,
  DeleteAllUserSessionsParameters,
  DeleteOldestUserSessionParameters,
  DeleteSessionByIdParameters,
  GetAllUserSessionsParameters,
  IsSessionsActiveCountExceededParameters,
} from './session.domain-type';

@Injectable()
export class SessionDomain {
  constructor(
    @Inject(SESSION_REPOSITORY_TOKEN)
    private readonly sessionCacheRepository: SessionCacheRepositoryInterface,
    private readonly timeService: TimeService,
    @Inject(USER_SESSION_REPOSITORY_TOKEN)
    private readonly userSessionRepository: UserSessionRepositoryInterface,
  ) {}

  public async createSession({ userId, userPrivacyInfo }: CreateSessionParameters) {
    const { ip, userAgent } = userPrivacyInfo;

    const createdAt = new Date();
    const expiredAt = this.timeService.addMilliseconds(createdAt, SESSION_LIFETIME_IN_MILLISECONDS);

    const { id: sessionId } = await this.userSessionRepository.add({ createdAt, expiredAt, userId });

    await this.sessionCacheRepository.set({ id: sessionId, ip, loggedAt: createdAt, userAgent, userId });

    return { sessionId };
  }

  public async deleteAllUserSessions({ userId }: DeleteAllUserSessionsParameters) {
    const deletedUserSessions = await this.userSessionRepository.deleteMultipleByUserIdAndGet({ userId });

    await Promise.all(deletedUserSessions.map(async ({ id }) => this.sessionCacheRepository.delete({ id })));
  }

  public async deleteOldestUserSession({ userId }: DeleteOldestUserSessionParameters) {
    await this.userSessionRepository.deleteOldestSession({ userId });
  }

  public async deleteSessionById({ sessionId }: DeleteSessionByIdParameters) {
    await this.sessionCacheRepository.delete({ id: sessionId });
    await this.userSessionRepository.deleteById({ sessionId });
  }

  public async getAllUserSessions({ userId }: GetAllUserSessionsParameters) {
    const userSessions = await this.userSessionRepository.findMultipleByUserId({ userId });

    return Promise.all(userSessions.map(async ({ id }) => this.sessionCacheRepository.get({ id })));
  }

  public async getSessionById({ sessionId }) {
    return this.sessionCacheRepository.get({ id: sessionId });
  }

  public async isSessionsActiveCountExceeded({ userId }: IsSessionsActiveCountExceededParameters) {
    const userSessionsCount = await this.userSessionRepository.getCountByUserId({ userId });

    return userSessionsCount >= SESSIONS_ACTIVE_COUNT;
  }
}
