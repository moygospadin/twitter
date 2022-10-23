import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EventName } from '../../common';
import { SignUpValidationRequestedMessage } from '../../inbound/client';

@Injectable()
export class SignUpValidationRequestedEeEvent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public async execute(message: SignUpValidationRequestedMessage): Promise<void> {
    this.eventEmitter.emit(EventName.signUpValidationRequested, message);
  }
}
