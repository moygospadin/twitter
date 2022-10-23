import { RabbitmqModuleOptions } from './rabbitmq-module-options.type';

export interface RabbitmqModuleOptionsFactory {
  createRabbitmqOptions(): Promise<RabbitmqModuleOptions> | RabbitmqModuleOptions;
}
