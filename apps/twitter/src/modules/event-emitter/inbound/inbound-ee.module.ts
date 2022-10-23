import { Module } from '@nestjs/common';

import { NotificationModule } from '../../notification';

import { SignUpValidationRequestedEeEventHandler, UserCreatedEeEventHandler } from './event';

@Module({
  controllers: [],
  exports: [],
  imports: [NotificationModule],
  providers: [SignUpValidationRequestedEeEventHandler, UserCreatedEeEventHandler],
})
export class InboundEeModule {}
