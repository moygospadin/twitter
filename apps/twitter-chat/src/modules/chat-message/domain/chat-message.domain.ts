import { Inject, Injectable } from '@nestjs/common';

import { CHAT_MESSAGE_REPOSITORY_TOKEN } from '../core/tokens';

import { CreateMessageParameters, GetChatMembersByChatIdParameters, ReplyMessageParameters } from './chat-message.domain-type';
import { createChatMessageError, replyChatMessageError } from './errors';
import { ChatAdminRepositoryInterface, ChatMemberRepositoryInterface, ChatMessageRepositoryInterface } from './repository-interfaces';

@Injectable()
export class ChatMessageDomain {
  constructor(
    @Inject(CHAT_MESSAGE_REPOSITORY_TOKEN)
    private readonly chatMessageRepository: ChatMessageRepositoryInterface &
      ChatMemberRepositoryInterface &
      ChatAdminRepositoryInterface,
  ) {}

  public async createMessage({ chatId, text, userId }: CreateMessageParameters) {
    const isUserExistInChat = await this.chatMessageRepository.isUserExistInChat({ chatId, userId });

    if (!isUserExistInChat) {
      return createChatMessageError.userNotExistInChat;
    }

    return this.chatMessageRepository.addChatMessage({ chatId, text, userId });
  }

  public async getChatMembersByChatId({ chatId }: GetChatMembersByChatIdParameters) {
    return this.chatMessageRepository.getChatMembersByChatId({ chatId });
  }

  public async replyMessage({ chatId, messageId, text, userId }: ReplyMessageParameters) {
    const isUserExistInChat = await this.chatMessageRepository.isUserExistInChat({ chatId, userId });

    if (!isUserExistInChat) {
      return replyChatMessageError.userNotExistInChat;
    }

    return this.chatMessageRepository.replyChatMessage({ chatId, messageId, text, userId });
  }
}
