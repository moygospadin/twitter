import { Injectable, Logger } from '@nestjs/common';

import { PubSub } from '@libs/graphql';

import { ChatMemberAddedEventMessage, chatMemberAddedEventName, ChatMemberAddedEventPayload } from '../ws-events-metadata';

@Injectable()
export class ChatMemberAddedEvent {
  private readonly logger = new Logger(ChatMemberAddedEvent.name);

  constructor(private readonly pubSub: PubSub) {}

  public async execute(message: ChatMemberAddedEventMessage): Promise<void> {
    const payload: ChatMemberAddedEventPayload = {
      [chatMemberAddedEventName]: message,
    };

    await this.pubSub.publish(chatMemberAddedEventName, payload);

    this.logger.debug(message, 'ChatMemberAdded event executed');
  }
}
