export interface ChatMemberAddedEventMessage {
  chatId: string;
  chatMembersToBeNotified: { userId: string }[];
  userId: string;
}

export const chatMemberAddedEventName = 'chatMemberAdded';
export type ChatMemberAddedEventPayload = { [chatMemberAddedEventName]: ChatMemberAddedEventMessage };
