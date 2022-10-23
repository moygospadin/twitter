import { ConsumeMessage } from 'amqplib';

import { Exchange } from '../../../../../core';
import { TwitterRoutingKey } from '../../../common';

export class ChatMemberAddedEventMessage {
  chatId: string;
  userId: string;
}

export abstract class ChatMemberAddedEventInterface {
  static config = {
    exchange: Exchange.topic,
    routingKey: TwitterRoutingKey.chatMemberAdded,
  };

  public abstract execute(input: ChatMemberAddedEventMessage, msg?: ConsumeMessage): Promise<void>;
}
