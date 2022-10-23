import { Transform } from 'class-transformer';

import { PrimaryKey, RedisEntity } from '@libs/redis';

const lifetimeOfSignUpValidationInMilliseconds = 60 * 60 * 1 * 1000;

import { SignUpValidationDomainModel } from '../../domain/models';

@RedisEntity({ keyPrefix: SignUpValidationEntity.name, ttlMilliseconds: lifetimeOfSignUpValidationInMilliseconds })
export class SignUpValidationEntity extends SignUpValidationDomainModel {
  @PrimaryKey()
  email: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  expiresAt: Date;
}
