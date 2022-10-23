import { RabbitMQModule, RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { RABBITMQ_MODULE_OPTIONS_TOKEN } from './core/tokens';
import { RabbitmqModuleAsyncOptions, RabbitmqModuleOptions, RabbitmqModuleOptionsFactory } from './core/types';

@Global()
@Module({
  exports: [RABBITMQ_MODULE_OPTIONS_TOKEN, RabbitMQModule],
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [RABBITMQ_MODULE_OPTIONS_TOKEN],
      useFactory: (options: RabbitmqModuleOptions): RabbitMQConfig => {
        const { url } = options;

        return { uri: url };
      },
    }),
  ],
})
export class RabbitmqModule {
  private static createAsyncProviders(options: RabbitmqModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: RabbitmqModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: RABBITMQ_MODULE_OPTIONS_TOKEN,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: RABBITMQ_MODULE_OPTIONS_TOKEN,
      useFactory: async (optionsFactory: RabbitmqModuleOptionsFactory) => {
        return optionsFactory.createRabbitmqOptions();
      },
    };
  }

  public static register(options: RabbitmqModuleOptions): DynamicModule {
    return {
      module: RabbitmqModule,
      providers: [
        {
          provide: RABBITMQ_MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
    };
  }

  public static registerAsync(options: RabbitmqModuleAsyncOptions): DynamicModule {
    return {
      imports: options.imports || [],
      module: RabbitmqModule,
      providers: this.createAsyncProviders(options),
    };
  }
}
