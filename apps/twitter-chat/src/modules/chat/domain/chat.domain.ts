import { Inject, Injectable } from '@nestjs/common';

import { ChatType } from '../core/enums';
import { CHAT_REPOSITORY_TOKEN } from '../core/tokens';

import {
  AddMemberToChatParameters,
  CreateGroupChatParameters,
  CreatePrivateChatParameters,
  GetChatMembersByChatIdParameters,
} from './chat.domain-type';
import { addMembersToChatError } from './errors';
import { ChatAdminRepositoryInterface, ChatMemberRepositoryInterface, ChatRepositoryInterface } from './repository-interfaces';

@Injectable()
export class ChatDomain {
  constructor(
    @Inject(CHAT_REPOSITORY_TOKEN)
    private readonly chatRepository: ChatAdminRepositoryInterface & ChatMemberRepositoryInterface & ChatRepositoryInterface,
  ) {}

  public async addMemberToChat({ chatId, member, userId }: AddMemberToChatParameters) {
    const isUserAChatAdmin = await this.chatRepository.isUserChatAdmin({ chatId, userId });

    if (!isUserAChatAdmin) {
      return addMembersToChatError.userIsNotChatAdmin;
    }

    return this.chatRepository.addChatMember({ chatId, member });
  }

  public async createGroupChat({ members, title, userId }: CreateGroupChatParameters) {
    const addedChat = await this.chatRepository.addGroupChat({
      title,
      type: ChatType.group,
      userId,
    });

    const { id: chatId } = addedChat;

    const chatMembers = await this.chatRepository.addChatMembers({ chatId, members });

    return { addedChat, chatMembers };
  }

  public async createPrivateChat({ member, userId }: CreatePrivateChatParameters) {
    const addedChat = await this.chatRepository.addPrivateChat({
      type: ChatType.private,
      userId,
    });

    const { id: chatId } = addedChat;

    const chatMembers = await this.chatRepository.addChatMembers({ chatId, members: [member, { userId }] });

    return { addedChat, chatMembers };
  }

  public async getChatMembersByChatId({ chatId }: GetChatMembersByChatIdParameters) {
    return this.chatRepository.getChatMembersByChatId({ chatId });
  }
}
