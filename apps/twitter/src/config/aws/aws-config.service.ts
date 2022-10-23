import { AwsModuleOptionsFactory, AwsModuleOptions } from '@jebulday/aws';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../configuration.type';

@Injectable()
export class AwsConfigService implements AwsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createAwsOptions(): AwsModuleOptions {
    const { accessKeyId, bucket, endpoint, expiresIn, region, secretAccessKey } = this.configService.get('aws');

    return {
      acl: 'private',
      bucket,
      credentials: { accessKeyId, secretAccessKey },
      endpoint,
      expiresIn,
      forcePathStyle: true, // only for minio
      region,
    };
  }
}
