export type ChatMessageCreatedEventMessage = (
  | Record<string, any>
  | { repliedTo: { chatId: string; createdAt: Date; id: string; text: string; updatedAt: Date; userId: string } }
) & {
  chatId: string;
  createdAt: Date;
  id: string;
  membersToBeNotified: { userId: string }[];
  text: string;
  updatedAt: Date;
  userId: string;
};

export const chatMessageCreatedEventName = 'chatMessageCreated';
export type ChatMessageCreatedEventPayload = { [chatMessageCreatedEventName]: ChatMessageCreatedEventMessage };
