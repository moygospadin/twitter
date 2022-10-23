import { ChatMessageDomainModel, ChatRepliedMessageDomainModel } from '../models';

export interface ChatMessageRepositoryInterface {
  addChatMessage(parameters: AddChatMessageParameters): Promise<ChatMessageDomainModel>;
  getChatMessages(parameters: GetChatMessagesParameters): Promise<(ChatMessageDomainModel | ChatRepliedMessageDomainModel)[]>;
  isUserExistInChat(parameters: IsUserExistInChatParameters): Promise<boolean>;
  replyChatMessage(parameters: ReplyChatMessageParameters): Promise<ChatRepliedMessageDomainModel>;
}

export interface AddChatMessageParameters {
  chatId: string;
  text: string;
  userId: string;
}

export interface GetChatMessagesParameters {
  chatId: string;
}

export interface IsUserExistInChatParameters {
  chatId: string;
  userId: string;
}

export interface ReplyChatMessageParameters {
  chatId: string;
  messageId: string;
  text: string;
  userId: string;
}
