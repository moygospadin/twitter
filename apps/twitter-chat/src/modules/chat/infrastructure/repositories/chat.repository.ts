import { Injectable } from '@nestjs/common';

import { PrismaTwitterClient } from '@libs/prisma/infrastructure/prisma-twitter.client';
import { InterfaceValidator } from '@typings';

import { ChatAdminType } from '../../core/enums';
import { ChatAdminDomainModel, ChatDomainModel, ChatMemberDomainModel } from '../../domain/models';
import {
  AddChatMemberParameters,
  AddChatMembersParameters,
  AddGroupChatParameters,
  AddPrivateChatParameters,
  ChatRepositoryInterface,
  GetChatMembersByChatIdParameters,
  IsUserExistInChatParameters,
  ChatAdminRepositoryInterface,
  ChatMemberRepositoryInterface,
  IsUserChatAdminParameters,
  AddChatAdminParameters,
} from '../../domain/repository-interfaces';

@Injectable()
export class ChatRepository
  implements
    InterfaceValidator<ChatRepository, ChatRepositoryInterface & ChatAdminRepositoryInterface & ChatMemberRepositoryInterface>
{
  constructor(private readonly prismaClient: PrismaTwitterClient) {}

  public async addChatAdmin({ adminType, chatId, userId }: AddChatAdminParameters): Promise<ChatAdminDomainModel> {
    const chatAdmin = await this.prismaClient.chatAdmins.create({ data: { chatId, type: adminType, userId } });

    return { ...chatAdmin, type: adminType };
  }

  public async addChatMember({ chatId, member }: AddChatMemberParameters): Promise<ChatMemberDomainModel> {
    const { userId } = member;

    await this.prismaClient.chatMembers.create({ data: { chatId, userId } });

    return { chatId, userId };
  }

  public async addChatMembers({ chatId, members }: AddChatMembersParameters): Promise<ChatMemberDomainModel[]> {
    const chatMembers = members.map(({ userId }) => ({ chatId, userId }));

    await this.prismaClient.chatMembers.createMany({ data: chatMembers });

    return chatMembers;
  }

  public async addGroupChat({ title, type, userId }: AddGroupChatParameters): Promise<ChatDomainModel> {
    const {
      createdAt,
      id: chatId,
      updatedAt,
    } = await this.prismaClient.chats.create({
      data: {
        chatAdmins: { createMany: { data: { type: ChatAdminType.owner, userId } } },
        title,
        type,
      },
    });

    return { createdAt, id: chatId, title, type, updatedAt, userId };
  }

  public async addPrivateChat({ type, userId }: AddPrivateChatParameters): Promise<ChatDomainModel> {
    const { createdAt, id: chatId, updatedAt } = await this.prismaClient.chats.create({ data: { title: null, type } });

    return {
      createdAt,
      id: chatId,
      title: null,
      type,
      updatedAt,
      userId,
    };
  }

  public async getChatMembersByChatId({ chatId }: GetChatMembersByChatIdParameters): Promise<ChatMemberDomainModel[]> {
    return this.prismaClient.chatMembers.findMany({ where: { chatId } });
  }

  public async isUserChatAdmin({ chatId, userId }: IsUserChatAdminParameters): Promise<boolean> {
    const count = await this.prismaClient.chatAdmins.count({ where: { chatId, userId } });

    return count > 0;
  }

  public async isUserExistInChat({ chatId, userId }: IsUserExistInChatParameters): Promise<boolean> {
    const count = await this.prismaClient.chatMembers.count({ where: { chatId, userId } });

    return count > 0;
  }
}
