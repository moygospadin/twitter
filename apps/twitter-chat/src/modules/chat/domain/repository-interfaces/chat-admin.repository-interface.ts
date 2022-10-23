import { ChatAdminType } from '../../core/enums';
import { ChatAdminDomainModel } from '../models';

export interface ChatAdminRepositoryInterface {
  addChatAdmin(parameters: AddChatAdminParameters): Promise<ChatAdminDomainModel>;
  isUserChatAdmin(parameters: IsUserChatAdminParameters): Promise<boolean>;
}

export interface AddChatAdminParameters {
  adminType: ChatAdminType;
  chatId: string;
  userId: string;
}

export interface IsUserChatAdminParameters {
  chatId: string;
  userId: string;
}
