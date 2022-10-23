import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { PRISMA_MODULE_OPTIONS_TOKEN } from './core/tokens';
import { PrismaModuleAsyncOptions, PrismaModuleOptions } from './core/types';
import { PrismaTwitterClient } from './infrastructure';

@Global()
@Module({
  controllers: [],
  exports: [PrismaTwitterClient],
  imports: [],
  providers: [PrismaTwitterClient],
})
export class PrismaModule {
  public static register(options: PrismaModuleOptions): DynamicModule {
    return {
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
    };
  }

  public static registerAsync(options: PrismaModuleAsyncOptions): DynamicModule {
    return {
      imports: options.imports || [],
      module: PrismaModule,
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(options: PrismaModuleAsyncOptions): Provider[] {
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

  private static createAsyncOptionsProvider(options: PrismaModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: PRISMA_MODULE_OPTIONS_TOKEN,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: PRISMA_MODULE_OPTIONS_TOKEN,
      useFactory: async (optionsFactory) => optionsFactory.createPrismaOptions(),
    };
  }
}
