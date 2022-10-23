import { Module } from '@nestjs/common';

import { PubSubModule } from '@libs/graphql';

import { ChatMessageService } from './application';
import { ChatMessageCreatedEvent } from './application/ws-events';
import { CHAT_MESSAGE_REPOSITORY_TOKEN } from './core/tokens';
import { ChatMessageDomain } from './domain';
import { ChatMessageRepository } from './infrastructure';
import { ChatMessageResolver, ChatMessageSubscriptionResolver } from './presentation';

@Module({
  controllers: [],
  exports: [],
  imports: [PubSubModule],
  providers: [
    { provide: CHAT_MESSAGE_REPOSITORY_TOKEN, useClass: ChatMessageRepository },
    ChatMessageCreatedEvent,
    ChatMessageDomain,
    ChatMessageResolver,
    ChatMessageService,
    ChatMessageSubscriptionResolver,
  ],
})
export class ChatMessageModule {}
