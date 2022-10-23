import { EventEmitterModuleOptions } from '@nestjs/event-emitter/dist/interfaces';

export interface EventEmitterConfig extends EventEmitterModuleOptions {
  delimiter?: string;
  global: boolean;
  ignoreErrors?: boolean;
  maxListeners?: number;
  newListener?: boolean;
  removeListener?: boolean;
  verboseMemoryLeak?: boolean;
  wildcard?: boolean;
}
