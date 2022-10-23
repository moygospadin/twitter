import { Transform } from 'class-transformer';

import { PrimaryKey, RedisEntity } from '@libs/redis';

import { SESSION_LIFETIME_IN_MILLISECONDS } from '../../core/constants';
import { SessionDomainModel } from '../../domain/models';

@RedisEntity({ keyPrefix: SessionEntity.name, ttlMilliseconds: SESSION_LIFETIME_IN_MILLISECONDS })
export class SessionEntity extends SessionDomainModel {
  @PrimaryKey()
  readonly id!: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  loggedAt: Date;
}
