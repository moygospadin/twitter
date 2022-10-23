import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

import { Repository } from '@libs/redis';
import { InterfaceValidator } from '@typings';

import { ResetPasswordValidationEntity } from '../entities';
import { ResetPasswordValidationCacheRepositoryInterface } from '../repository-interfaces';

@Injectable()
export class ResetPasswordValidationCacheRepository
  extends Repository<ResetPasswordValidationEntity>
  implements InterfaceValidator<ResetPasswordValidationEntity, ResetPasswordValidationCacheRepositoryInterface>
{
  constructor(@InjectRedis() private readonly redis: Redis) {
    super(redis, { baseClass: ResetPasswordValidationEntity });
  }
}
