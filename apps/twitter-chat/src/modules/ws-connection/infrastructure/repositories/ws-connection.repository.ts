import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

import { Repository } from '@libs/redis';

import { WsConnectionEntity } from '../entities';

@Injectable()
export class WsConnectionCacheRepository extends Repository<WsConnectionEntity> {
  constructor(@InjectRedis() private readonly redis: Redis) {
    super(redis, { baseClass: WsConnectionEntity });
  }
}
