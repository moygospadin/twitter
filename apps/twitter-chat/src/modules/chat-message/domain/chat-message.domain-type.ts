export interface CreateMessageParameters {
  chatId: string;
  text: string;
  userId: string;
}

export interface GetChatMembersByChatIdParameters {
  chatId: string;
}

export interface ReplyMessageParameters {
  chatId: string;
  messageId: string;
  text: string;
  userId: string;
}
