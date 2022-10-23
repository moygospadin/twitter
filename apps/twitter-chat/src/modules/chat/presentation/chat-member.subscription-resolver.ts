import { Resolver, Subscription } from '@nestjs/graphql';

import { CurrentUser } from '@libs/auth';
import { PubSub } from '@libs/graphql';

import { chatMemberAddedEventName, ChatMemberAddedEventPayload } from '../application/ws-events-metadata';

import { ChatMemberSubscriptionDto } from './dtos';

@Resolver(() => ChatMemberSubscriptionDto)
export class ChatMemberSubscriptionResolver {
  constructor(private readonly pubSub: PubSub) {}

  @Subscription(() => String, {
    filter: ({ [chatMemberAddedEventName]: chatMemberAddedPayload }: ChatMemberAddedEventPayload, _, currentUser: CurrentUser) => {
      const { userId } = currentUser;
      const { chatMembersToBeNotified } = chatMemberAddedPayload;

      return chatMembersToBeNotified.some((member) => member.userId === userId);
    },
    name: chatMemberAddedEventName,
    resolve: ({ [chatMemberAddedEventName]: chatMemberAddedPayload }: ChatMemberAddedEventPayload): ChatMemberSubscriptionDto => {
      const { chatId, userId } = chatMemberAddedPayload;

      return { chatId, userId };
    },
  })
  public async chatMemberAddedHandler() {
    return this.pubSub.asyncIterator(chatMemberAddedEventName);
  }
}
