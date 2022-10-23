import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaModuleOptions, PrismaModuleOptionsFactory } from '@libs/prisma';

import { Config } from '../configuration.type';

@Injectable()
export class PrismaConfigService implements PrismaModuleOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createPrismaOptions(): PrismaModuleOptions | Promise<PrismaModuleOptions> {
    const { url } = this.configService.get('prisma');

    return { url };
  }
}
