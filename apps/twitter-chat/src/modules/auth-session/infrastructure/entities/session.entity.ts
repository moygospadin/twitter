import { Transform } from 'class-transformer';

import { PrimaryKey, RedisEntity } from '@libs/redis';

@RedisEntity({ keyPrefix: SessionEntity.name })
export class SessionEntity {
  @PrimaryKey()
  readonly id!: string;

  ip: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  loggedAt: Date;

  userAgent: string;

  userId: string;
}
