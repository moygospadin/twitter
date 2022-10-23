import { Resolver, Subscription } from '@nestjs/graphql';

import { GqlSubscriptionsContext } from '@libs/auth';
import { PubSub } from '@libs/graphql';

import { chatMessageCreatedEventName, ChatMessageCreatedEventPayload } from '../application';

import { chatMessageSubscriptionDto, ChatMessageSubscriptionDto } from './dtos';

@Resolver()
export class ChatMessageSubscriptionResolver {
  constructor(private readonly pubSub: PubSub) {}

  @Subscription(() => chatMessageSubscriptionDto, {
    filter: (
      { [chatMessageCreatedEventName]: chatMessageCreatedPayload }: ChatMessageCreatedEventPayload,
      _,
      { currentUser }: GqlSubscriptionsContext,
    ) => {
      const { userId } = currentUser;
      const { membersToBeNotified } = chatMessageCreatedPayload;

      return chatMessageCreatedPayload.userId !== userId && membersToBeNotified.some((member) => member.userId === userId);
    },
    name: chatMessageCreatedEventName,
    resolve: ({
      [chatMessageCreatedEventName]: chatMessageCreatedPayload,
    }: ChatMessageCreatedEventPayload): ChatMessageSubscriptionDto => {
      return chatMessageCreatedPayload;
    },
  })
  public async chatMessageCreated() {
    return this.pubSub.asyncIterator(chatMessageCreatedEventName);
  }
}
