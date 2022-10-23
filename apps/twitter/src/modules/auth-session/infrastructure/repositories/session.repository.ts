import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

import { CurrentUser, GetSessionParameters, SessionStorageInterface } from '@libs/auth';
import { Repository } from '@libs/redis';
import { InterfaceValidator } from '@typings';

import { SessionCacheRepositoryInterface } from '../../domain/repository-interfaces';
import { SessionEntity } from '../entities';

@Injectable()
export class SessionCacheRepository
  extends Repository<SessionEntity>
  implements InterfaceValidator<SessionCacheRepository, SessionCacheRepositoryInterface & SessionStorageInterface>
{
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
