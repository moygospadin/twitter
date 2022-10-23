import { PrimaryKey, RedisEntity } from '@libs/redis';

const wsConnectionLifetimeInMilliseconds = 60 * 60 * 1 * 1000;

@RedisEntity({ keyPrefix: WsConnectionEntity.name, ttlMilliseconds: wsConnectionLifetimeInMilliseconds })
export class WsConnectionEntity {
  @PrimaryKey()
  socketId: string;

  userId: string;
}
