import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RabbitmqModuleOptions, RabbitmqModuleOptionsFactory } from '@libs/rabbitmq';

import { Config } from '../configuration.type';

@Injectable()
export class RabbitmqConfigService implements RabbitmqModuleOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createRabbitmqOptions(): RabbitmqModuleOptions {
    const { url } = this.configService.get('rabbitmq');

    return { url };
  }
}
