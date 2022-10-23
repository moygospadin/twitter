import { Transform } from 'class-transformer';

import { PrimaryKey, RedisEntity } from '@libs/redis';

import { RESET_PASSWORD_VALIDATION_LIFETIME_IN_MILLISECONDS } from '../../core/constants';
import { ResetPasswordDomainModel } from '../../domain/models';

@RedisEntity({ keyPrefix: ResetPasswordValidationEntity.name, ttlMilliseconds: RESET_PASSWORD_VALIDATION_LIFETIME_IN_MILLISECONDS })
export class ResetPasswordValidationEntity extends ResetPasswordDomainModel {
  @PrimaryKey()
  email: string;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  expiredAt: Date;
}
