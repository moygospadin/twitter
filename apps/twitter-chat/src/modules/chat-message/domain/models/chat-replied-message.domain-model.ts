export interface ChatRepliedMessageDomainModel {
  chatId: string;
  createdAt: Date;
  id: string;
  repliedTo: {
    chatId: string;
    createdAt: Date;
    id: string;
    text: string;
    updatedAt: Date;
    userId: string;
  };
  text: string;
  updatedAt: Date;
  userId: string;
}
