import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

import { CurrentUser, GetSessionParameters, SessionStorageInterface } from '@libs/auth';
import { Repository } from '@libs/redis';

import { SessionEntity } from '../entities';

@Injectable()
export class SessionCacheRepository extends Repository<SessionEntity> implements SessionStorageInterface {
  constructor(@InjectRedis() private readonly redis: Redis) {
    super(redis, { baseClass: SessionEntity });
  }

  public async getSession({ sessionId }: GetSessionParameters): Promise<CurrentUser> {
    const session = await this.get({ id: sessionId });

    if (!session) {
      return null;
    }

    const { userId } = session;

    return { sessionId, userId };
  }
}
