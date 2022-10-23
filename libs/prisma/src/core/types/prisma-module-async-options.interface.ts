import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { PrismaModuleOptionsFactory } from './prisma-module-options-factory.interface';
import { PrismaModuleOptions } from './prisma-module-options.type';

export interface PrismaModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PrismaModuleOptionsFactory>;
  useExisting?: Type<PrismaModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<PrismaModuleOptions> | PrismaModuleOptions;
}
