import { Injectable, Logger } from '@nestjs/common';

import { PubSub } from '@libs/graphql';

import { ChatCreatedEventMessage, chatCreatedEventName, ChatCreatedEventPayload } from '../ws-events-metadata';

@Injectable()
export class ChatCreatedEvent {
  private readonly logger = new Logger(ChatCreatedEvent.name);

  constructor(private readonly pubSub: PubSub) {}

  public async execute(message: ChatCreatedEventMessage): Promise<void> {
    const payload: ChatCreatedEventPayload = {
      [chatCreatedEventName]: message,
    };

    await this.pubSub.publish(chatCreatedEventName, payload);

    this.logger.debug(message, 'ChatCreated event executed');
  }
}
