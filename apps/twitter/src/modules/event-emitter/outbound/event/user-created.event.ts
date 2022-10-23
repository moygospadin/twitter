import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EventName } from '../../common';
import { UserCreatedMessage } from '../../inbound/client';

@Injectable()
export class UserCreatedEeEvent {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public async execute(message: UserCreatedMessage): Promise<void> {
    this.eventEmitter.emit(EventName.userCreated, message);
  }
}
