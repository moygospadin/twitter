import { ChatType } from '../../core/enums';

export interface ChatDomainModel {
  createdAt: Date;
  id: string;
  title: string;
  type: ChatType;
  updatedAt: Date;
  userId: string;
}
