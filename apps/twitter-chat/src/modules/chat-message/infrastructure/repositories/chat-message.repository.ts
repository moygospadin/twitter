import { Injectable } from '@nestjs/common';

import { PrismaTwitterClient } from '@libs/prisma/infrastructure/prisma-twitter.client';
import { InterfaceValidator } from '@typings';

import { ChatMemberDomainModel, ChatMessageDomainModel, ChatRepliedMessageDomainModel } from '../../domain/models';
import {
  AddChatMessageParameters,
  ChatAdminRepositoryInterface,
  ChatMemberRepositoryInterface,
  ChatMessageRepositoryInterface,
  GetChatMembersByChatIdParameters,
  GetChatMessagesParameters,
  IsUserChatAdminParameters,
  IsUserExistInChatParameters,
  ReplyChatMessageParameters,
} from '../../domain/repository-interfaces';

@Injectable()
export class ChatMessageRepository
  implements
    InterfaceValidator<
      ChatMessageRepository,
      ChatMessageRepositoryInterface & ChatAdminRepositoryInterface & ChatMemberRepositoryInterface
    >
{
  constructor(private readonly prismaClient: PrismaTwitterClient) {}

  public async addChatMessage({ chatId, text, userId }: AddChatMessageParameters): Promise<ChatMessageDomainModel> {
    return this.prismaClient.chatsMessages.create({ data: { chatId, replyToMessageId: null, text, userId } });
  }

  public async getChatMembersByChatId({ chatId }: GetChatMembersByChatIdParameters): Promise<ChatMemberDomainModel[]> {
    return this.prismaClient.chatMembers.findMany({ where: { chatId } });
  }

  public async getChatMessages({
    chatId,
  }: GetChatMessagesParameters): Promise<(ChatMessageDomainModel | ChatRepliedMessageDomainModel)[]> {
    const chatMessages = await this.prismaClient.chatsMessages.findMany({ include: { chatsMessages: true }, where: { chatId } });

    return chatMessages.map((chatMessage) => {
      const { chatId, chatsMessages: repliedMessage, createdAt, id, replyToMessageId, text, updatedAt, userId } = chatMessage;

      if (replyToMessageId) {
        return {
          chatId,
          createdAt,
          id,
          repliedTo: {
            chatId: repliedMessage.chatId,
            createdAt: repliedMessage.createdAt,
            id: repliedMessage.id,
            text: repliedMessage.text,
            updatedAt: repliedMessage.updatedAt,
            userId: repliedMessage.userId,
          },
          text,
          updatedAt,
          userId,
        } as ChatRepliedMessageDomainModel;
      }

      return { chatId, createdAt, id, text, updatedAt, userId } as ChatMessageDomainModel;
    });
  }

  public async isUserChatAdmin({ chatId, userId }: IsUserChatAdminParameters): Promise<boolean> {
    const count = await this.prismaClient.chatAdmins.count({ where: { chatId, userId } });

    return count > 0;
  }

  public async isUserExistInChat({ chatId, userId }: IsUserExistInChatParameters): Promise<boolean> {
    const count = await this.prismaClient.chatMembers.count({ where: { chatId, userId } });

    return count > 0;
  }

  public async replyChatMessage({
    chatId,
    messageId,
    text,
    userId,
  }: ReplyChatMessageParameters): Promise<ChatRepliedMessageDomainModel> {
    const {
      chatsMessages: repliedMessage,
      createdAt,
      id,
      updatedAt,
    } = await this.prismaClient.chatsMessages.create({
      data: { chatId, replyToMessageId: messageId, text, userId },
      include: { chatsMessages: true },
    });

    return {
      chatId,
      createdAt,
      id,
      repliedTo: {
        chatId: repliedMessage.chatId,
        createdAt: repliedMessage.createdAt,
        id: repliedMessage.id,
        text: repliedMessage.text,
        updatedAt: repliedMessage.updatedAt,
        userId: repliedMessage.userId,
      },
      text,
      updatedAt,
      userId,
    };
  }
}
