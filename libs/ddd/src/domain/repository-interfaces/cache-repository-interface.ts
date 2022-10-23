import { DeepPartial } from '@typings';

export interface CacheRepositoryInterface<T> {
  delete(domainModel: DeepPartial<T>): Promise<void>;
  get(domainModel: DeepPartial<T>): Promise<T>;
  set(domainModel: DeepPartial<T>): Promise<void>;
}
