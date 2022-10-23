import { CacheRepositoryInterface } from '@ddd/core';

import { SignUpValidationDomainModel } from '../models';

export interface SignUpValidationCacheRepositoryInterface extends CacheRepositoryInterface<SignUpValidationDomainModel> {}
