import { ChatMemberDomainModel } from '../models';

export interface ChatMemberRepositoryInterface {
  getChatMembersByChatId(parameters: GetChatMembersByChatIdParameters): Promise<ChatMemberDomainModel[]>;
}

export interface GetChatMembersByChatIdParameters {
  chatId: string;
}
