import { CacheRepositoryInterface } from '@ddd/core';

import { ResetPasswordDomainModel } from '../models';

export interface ResetPasswordCacheRepositoryInterface extends CacheRepositoryInterface<ResetPasswordDomainModel> {}
