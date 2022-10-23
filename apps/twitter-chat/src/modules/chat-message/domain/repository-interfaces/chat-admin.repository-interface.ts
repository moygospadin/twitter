export interface ChatAdminRepositoryInterface {
  isUserChatAdmin(parameters: IsUserChatAdminParameters): Promise<boolean>;
}

export interface IsUserChatAdminParameters {
  chatId: string;
  userId: string;
}
