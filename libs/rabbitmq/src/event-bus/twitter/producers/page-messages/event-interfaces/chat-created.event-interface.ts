import { ConsumeMessage } from 'amqplib';

import { Exchange } from '../../../../../core';
import { TwitterRoutingKey } from '../../../common';

export class ChatCreatedEventMessage {
  chatId: string;
  chatTitle: string;
}

export abstract class ChatCreatedEventInterface {
  static config = {
    exchange: Exchange.topic,
    routingKey: TwitterRoutingKey.chatCreated,
  };

  public abstract execute(input: ChatCreatedEventMessage, msg?: ConsumeMessage): Promise<void>;
}
