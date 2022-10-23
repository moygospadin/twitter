import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser, CurrentUserArgs } from '@libs/auth';

import { ChatMessageService } from '../application';

import { ChatMessageDto } from './dtos';
import { CreateChatMessageInput, ReplyChatMessageInput } from './inputs';

@Resolver(() => ChatMessageDto)
export class ChatMessageResolver {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Mutation(() => String)
  public async createMessage(@Args('input') input: CreateChatMessageInput, @CurrentUserArgs() currentUser: CurrentUser) {
    const { chatId, text } = input;

    await this.chatMessageService.createMessage({ chatId, currentUser, text });

    return '';
  }

  @Mutation(() => String)
  public async replyMessage(@Args('input') input: ReplyChatMessageInput, @CurrentUserArgs() currentUser: CurrentUser) {
    const { chatId, messageId, text } = input;

    await this.chatMessageService.replyMessage({ chatId, currentUser, messageId, text });

    return '';
  }
}
