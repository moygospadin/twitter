import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, CurrentUserArgs } from '@libs/auth';

import { ChatService } from '../application';

import { ChatSubscriptionDto } from './dtos';
import { AddMemberToChatInput, CreateGroupChatInput, CreatePrivateChatInput } from './inputs';
import { AddMemberToChatResult, CreateGroupChatResult, CreatePrivateChatResult } from './results';

@Resolver(() => ChatSubscriptionDto)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => AddMemberToChatResult)
  public async addMemberToChat(
    @Args('input') input: AddMemberToChatInput,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<AddMemberToChatResult> {
    const { chatId, member } = input;

    await this.chatService.addMemberToChat({ chatId, currentUser, member });

    return { error: null };
  }

  @Mutation(() => CreateGroupChatResult)
  public async createGroupChat(
    @Args('input') input: CreateGroupChatInput,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<CreateGroupChatResult> {
    const { members, title } = input;

    await this.chatService.createGroupChat({ currentUser, members, title });

    return { error: null };
  }

  @Mutation(() => CreatePrivateChatResult)
  public async createPrivateChat(
    @Args('input') input: CreatePrivateChatInput,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<CreatePrivateChatResult> {
    const { member } = input;

    await this.chatService.createPrivateChat({ currentUser, member });

    return { error: null };
  }

  @Query(() => String)
  public async getUserChats(): Promise<string> {
    return '';
  }
}
