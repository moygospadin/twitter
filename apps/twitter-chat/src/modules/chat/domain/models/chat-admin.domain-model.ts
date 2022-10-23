import { ChatAdminType } from '../../core/enums';

export interface ChatAdminDomainModel {
  chatId: string;
  id: string;
  type: ChatAdminType;
  userId: string;
}
