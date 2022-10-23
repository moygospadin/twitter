import { ChatMemberDomainModel } from '../models';

export interface ChatMemberRepositoryInterface {
  addChatMember(parameters: AddChatMemberParameters): Promise<ChatMemberDomainModel>;
  addChatMembers(parameters: AddChatMembersParameters): Promise<ChatMemberDomainModel[]>;
  getChatMembersByChatId(parameters: GetChatMembersByChatIdParameters): Promise<ChatMemberDomainModel[]>;
  isUserExistInChat(parameters: IsUserExistInChatParameters): Promise<boolean>;
}

export interface AddChatMemberParameters {
  chatId: string;
  member: Omit<ChatMemberDomainModel, 'chatId'>;
}

export interface AddChatMembersParameters {
  chatId: string;
  members: Omit<ChatMemberDomainModel, 'chatId'>[];
}

export interface GetChatMembersByChatIdParameters {
  chatId: string;
}

export interface IsUserExistInChatParameters {
  chatId: string;
  userId: string;
}
