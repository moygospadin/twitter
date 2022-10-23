import { PrismaModuleOptions } from './prisma-module-options.type';

export interface PrismaModuleOptionsFactory {
  createPrismaOptions(): Promise<PrismaModuleOptions> | PrismaModuleOptions;
}
