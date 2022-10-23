import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EventName } from '../../../common';
import { UserCreatedMessage } from '../message';

@Injectable()
export class UserCreatedEeEventHandler {
  @OnEvent(EventName.userCreated)
  public async handleUserCreated(message: UserCreatedMessage): Promise<void> {
    return;
  }
}
