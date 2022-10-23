import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';

import { Repository } from '@libs/redis';
import { InterfaceValidator } from '@typings';

import { SignUpValidationCacheRepositoryInterface } from '../../domain/repository-interfaces';
import { SignUpValidationEntity } from '../entities';

@Injectable()
export class SignUpValidationRepository
  extends Repository<SignUpValidationEntity>
  implements InterfaceValidator<SignUpValidationRepository, SignUpValidationCacheRepositoryInterface>
{
  constructor(@InjectRedis() private readonly redis: Redis) {
    super(redis, { baseClass: SignUpValidationEntity });
  }
}
