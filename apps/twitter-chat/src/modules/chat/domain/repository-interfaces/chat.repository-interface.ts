import { ChatType } from '../../core/enums';
import { ChatDomainModel } from '../models';

export interface ChatRepositoryInterface {
  addGroupChat(parameters: AddGroupChatParameters): Promise<ChatDomainModel>;
  addPrivateChat(parameters: AddPrivateChatParameters): Promise<ChatDomainModel>;
}

export interface AddGroupChatParameters {
  title: string;
  type: ChatType;
  userId: string;
}

export interface AddPrivateChatParameters {
  type: ChatType;
  userId: string;
}
