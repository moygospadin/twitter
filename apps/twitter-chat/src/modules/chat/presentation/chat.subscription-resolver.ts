import { Resolver, Subscription } from '@nestjs/graphql';

import { CurrentUser } from '@libs/auth';
import { PubSub } from '@libs/graphql';

import { chatCreatedEventName, ChatCreatedEventPayload } from '../application/ws-events-metadata';

import { ChatSubscriptionDto } from './dtos';

@Resolver(() => ChatSubscriptionDto)
export class ChatSubscriptionResolver {
  constructor(private readonly pubSub: PubSub) {}

  @Subscription(() => ChatSubscriptionDto, {
    filter: ({ [chatCreatedEventName]: chatCreatedPayload }: ChatCreatedEventPayload, _, currentUser: CurrentUser) => {
      const { userId } = currentUser;
      const { members } = chatCreatedPayload;

      return members.some((member) => member.userId === userId);
    },
    name: 'chatCreated',
    resolve: ({ [chatCreatedEventName]: chatCreatedPayload }: ChatCreatedEventPayload): ChatSubscriptionDto => {
      return { id: chatCreatedPayload.chatId, name: chatCreatedPayload.chatTitle };
    },
  })
  public async chatCreatedHandler() {
    return this.pubSub.asyncIterator('chatCreated');
  }
}
