export interface ChatCreatedEventMessage {
  chatId: string;
  chatTitle: string | null;
  members: { userId: string }[];
}

export const chatCreatedEventName = 'chatCreated';
export type ChatCreatedEventPayload = { [chatCreatedEventName]: ChatCreatedEventMessage };
