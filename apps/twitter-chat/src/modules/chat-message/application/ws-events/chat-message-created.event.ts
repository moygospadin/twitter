import { Injectable, Logger } from '@nestjs/common';

import { PubSub } from '@libs/graphql';

import { ChatMessageCreatedEventMessage, chatMessageCreatedEventName, ChatMessageCreatedEventPayload } from '../ws-events-metadata';

@Injectable()
export class ChatMessageCreatedEvent {
  private readonly logger = new Logger(ChatMessageCreatedEvent.name);

  constructor(private readonly pubSub: PubSub) {}

  public async execute(message: ChatMessageCreatedEventMessage): Promise<void> {
    const payload: ChatMessageCreatedEventPayload = {
      [chatMessageCreatedEventName]: message,
    };

    await this.pubSub.publish(chatMessageCreatedEventName, payload);

    this.logger.debug(message, 'ChatMessageCreated event executed');
  }
}
