import { Module } from '@nestjs/common';

import { SignUpValidationRequestedEeEvent, UserCreatedEeEvent } from './event';

@Module({
  controllers: [],
  exports: [SignUpValidationRequestedEeEvent, UserCreatedEeEvent],
  imports: [],
  providers: [SignUpValidationRequestedEeEvent, UserCreatedEeEvent],
})
export class OutboundEeModule {}
