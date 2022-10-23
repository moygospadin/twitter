import { ConsumeMessage } from 'amqplib';

import { Exchange } from '../../../../../core';
import { TwitterRoutingKey } from '../../../common';

export class MessageCreatedEventMessage {
  chatId: string;
  createdAt: Date;
  messageId: string;
  text: string;
}

export abstract class MessageCreatedEventInterface {
  static config = {
    exchange: Exchange.topic,
    routingKey: TwitterRoutingKey.messageCreated,
  };

  public abstract execute(input: MessageCreatedEventMessage, msg?: ConsumeMessage): Promise<void>;
}
