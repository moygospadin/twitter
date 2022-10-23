import { Redis } from '@nestjs-modules/ioredis';
import { ClassConstructor, plainToInstance } from 'class-transformer';

import { PRIMARY_KEY_METADATA_KEY, REDIS_ENTITY_METADATA_KEY } from '../../core';
import { DecoratedRedisEntityFields } from '../../decorators';

interface RepositoryOptions<T> {
  baseClass: ClassConstructor<T>;
}

export class Repository<T> {
  private readonly baseEntity: ClassConstructor<T>;

  private readonly primaryKey: string;
  private readonly redisEntityMetadata: DecoratedRedisEntityFields;

  private readonly storageKeyPrefix: string;
  private readonly ttlMilliseconds: number;

  constructor(private readonly redisClient: Redis, private readonly repositoryOptions: RepositoryOptions<T>) {
    this.baseEntity = this.repositoryOptions.baseClass;

    this.primaryKey = Reflect.getMetadata(PRIMARY_KEY_METADATA_KEY, this.baseEntity);
    this.redisEntityMetadata = Reflect.getMetadata(REDIS_ENTITY_METADATA_KEY, this.baseEntity);

    this.validateMetadata(this.redisEntityMetadata, this.primaryKey);

    this.storageKeyPrefix = this.redisEntityMetadata.get('keyPrefix') as string;
    this.ttlMilliseconds = this.redisEntityMetadata.get('ttlMilliseconds') as number;
  }

  private validateMetadata(redisEntityMetadata, primaryKeyMetadata) {
    if (!redisEntityMetadata) {
      throw new Error('If you want to use redis repository you should call @RedisEntity decorator');
    }

    if (!primaryKeyMetadata) {
      throw new Error('Primary key not found');
    }
  }

  public async delete(entity: Partial<T>): Promise<void> {
    const key = entity[this.primaryKey];

    await this.redisClient.del(`${this.storageKeyPrefix}_${key}`);
  }

  public async get(entity: Partial<T>): Promise<T> {
    const key = entity[this.primaryKey];
    const stringifiedValue = await this.redisClient.get(`${this.storageKeyPrefix}_${key}`);

    if (!stringifiedValue) {
      return stringifiedValue as undefined;
    }

    return plainToInstance(this.repositoryOptions.baseClass, JSON.parse(stringifiedValue));
  }

  public async set(entity: T): Promise<void> {
    const key = entity[this.primaryKey];
    const keyWithPrefix = `${this.storageKeyPrefix}_${key}`;

    const stringifiedValue = JSON.stringify(entity);

    if (this.ttlMilliseconds) {
      await this.redisClient.set(keyWithPrefix, stringifiedValue, 'PX', this.ttlMilliseconds);

      return;
    }

    await this.redisClient.set(keyWithPrefix, stringifiedValue);
  }
}
