import { Module } from '@nestjs/common';

import { PubSubModule } from '@libs/graphql';

import { ChatService } from './application';
import { ChatMemberAddedEvent, ChatCreatedEvent } from './application/ws-events';
import { CHAT_REPOSITORY_TOKEN } from './core/tokens';
import { ChatDomain } from './domain';
import { ChatRepository } from './infrastructure';
import { ChatMemberSubscriptionResolver, ChatResolver, ChatSubscriptionResolver } from './presentation';

@Module({
  controllers: [],
  exports: [],
  imports: [PubSubModule],
  providers: [
    ChatCreatedEvent,
    ChatDomain,
    ChatMemberAddedEvent,
    ChatMemberSubscriptionResolver,
    ChatResolver,
    ChatService,
    ChatSubscriptionResolver,
    { provide: CHAT_REPOSITORY_TOKEN, useClass: ChatRepository },
  ],
})
export class ChatModule {}
