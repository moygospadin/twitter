import { Injectable } from '@nestjs/common';

import { ForbiddenException } from '@libs/exceptions';

import { ChatDomain } from '../domain';

import { ChatCreatedEvent, ChatMemberAddedEvent } from './ws-events';

@Injectable()
export class ChatService {
  private readonly errorContext = 'Chat service';

  constructor(
    private readonly chatDomain: ChatDomain,
    private readonly chatMemberAddedEvent: ChatMemberAddedEvent,
    private readonly chatCreatedEvent: ChatCreatedEvent,
  ) {}

  public async addMemberToChat({ chatId, currentUser, member }) {
    const { userId } = currentUser;

    const chatMembersToBeNotified = await this.chatDomain.getChatMembersByChatId({ chatId });
    const addedMember = await this.chatDomain.addMemberToChat({ chatId, member, userId });

    if (addedMember === 'userIsNotChatAdmin') {
      throw new ForbiddenException(this.errorContext, 'userIsNotChatAdmin');
    }

    this.chatMemberAddedEvent.execute({ chatId, chatMembersToBeNotified, userId });

    return addedMember;
  }

  public async createGroupChat({ currentUser, members, title }) {
    const { userId } = currentUser;

    const { addedChat, chatMembers } = await this.chatDomain.createGroupChat({ members, title, userId });

    await this.chatCreatedEvent.execute({ chatId: addedChat.id, chatTitle: null, members: chatMembers });

    return addedChat;
  }

  public async createPrivateChat({ currentUser, member }) {
    const { userId } = currentUser;

    const { addedChat, chatMembers } = await this.chatDomain.createPrivateChat({ member, userId });

    await this.chatCreatedEvent.execute({ chatId: addedChat.id, chatTitle: addedChat.title, members: chatMembers });

    return addedChat;
  }

  public async getChatMembersByChatId({ chatId }) {
    return this.chatDomain.getChatMembersByChatId({ chatId });
  }
}
