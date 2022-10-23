import { CacheRepositoryInterface } from '@ddd/core';

import { SessionDomainModel } from '../models';

export interface SessionCacheRepositoryInterface extends CacheRepositoryInterface<SessionDomainModel> {}
