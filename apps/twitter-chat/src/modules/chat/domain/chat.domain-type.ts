import { ChatMemberDomainModel } from './models';

export interface AddMemberToChatParameters {
  chatId: string;
  member: Omit<ChatMemberDomainModel, 'chatId'>;
  userId: string;
}

interface Member {
  userId: string;
}

export interface CreateGroupChatParameters {
  members: Member[];
  title: string;
  userId: string;
}

export interface CreatePrivateChatParameters {
  member: Member;
  userId: string;
}

export interface GetChatMembersByChatIdParameters {
  chatId: string;
}
