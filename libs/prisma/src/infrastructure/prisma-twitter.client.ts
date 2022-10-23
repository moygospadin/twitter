import { INestApplication, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/twitter';

import { PRISMA_MODULE_OPTIONS_TOKEN } from '../core/tokens';
import { PrismaModuleOptions } from '../core/types';

@Injectable()
export class PrismaTwitterClient extends PrismaClient implements OnModuleInit {
  constructor(@Inject(PRISMA_MODULE_OPTIONS_TOKEN) private readonly options: PrismaModuleOptions) {
    super({ datasources: { db: { url: options.url } }, log: ['error', 'info', 'query', 'warn'] });
  }

  public async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  public async onModuleInit() {
    await this.$connect();
  }
}
