import { CacheRepositoryInterface } from '@ddd/core';

import { ResetPasswordValidationEntity } from '../entities';

export interface ResetPasswordValidationCacheRepositoryInterface extends CacheRepositoryInterface<ResetPasswordValidationEntity> {}
