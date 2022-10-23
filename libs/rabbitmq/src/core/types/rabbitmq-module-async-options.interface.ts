import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { RabbitmqModuleOptionsFactory } from './rabbitmq-module-options-factory.interface';
import { RabbitmqModuleOptions } from './rabbitmq-module-options.type';

export interface RabbitmqModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<RabbitmqModuleOptionsFactory>;
  useExisting?: Type<RabbitmqModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<RabbitmqModuleOptions> | RabbitmqModuleOptions;
}
