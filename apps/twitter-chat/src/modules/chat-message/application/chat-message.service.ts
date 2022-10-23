import { Injectable } from '@nestjs/common';

import { ForbiddenException } from '@libs/exceptions';

import { ChatMessageDomain } from '../domain';

import { ChatMessageCreatedEvent } from './ws-events';

@Injectable()
export class ChatMessageService {
  private readonly errorContext = 'Chat service';

  constructor(
    private readonly chatMessageCreatedEvent: ChatMessageCreatedEvent,
    private readonly chatMessageDomain: ChatMessageDomain,
  ) {}

  public async createMessage({ chatId, currentUser, text }) {
    const { userId } = currentUser;

    const membersToBeNotified = await this.chatMessageDomain.getChatMembersByChatId({ chatId });
    const createdMessage = await this.chatMessageDomain.createMessage({ chatId, text, userId });

    if (createdMessage === 'userNotExistInChat') {
      throw new ForbiddenException(this.errorContext);
    }

    this.chatMessageCreatedEvent.execute({ ...createdMessage, membersToBeNotified });

    return createdMessage;
  }

  public async replyMessage({ chatId, currentUser, messageId, text }) {
    const { userId } = currentUser;

    const membersToBeNotified = await this.chatMessageDomain.getChatMembersByChatId({ chatId });
    const repliedMessage = await this.chatMessageDomain.replyMessage({ chatId, messageId, text, userId });

    if (repliedMessage === 'userNotExistInChat') {
      throw new ForbiddenException(this.errorContext);
    }

    this.chatMessageCreatedEvent.execute({ ...repliedMessage, membersToBeNotified });

    return repliedMessage;
  }
}
