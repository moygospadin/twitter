import { EventEmitterConfig } from './event-emitter-config.interface';

export const eventEmitterConfiguration: EventEmitterConfig = {
  delimiter: '.',
  global: true,
  ignoreErrors: false,
  maxListeners: 10,
  newListener: false,
  removeListener: false,
  verboseMemoryLeak: false,
  wildcard: false,
};
