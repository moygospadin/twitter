import { ConsumeMessage } from 'amqplib';

import { Exchange } from '../../../../../core';
import { TwitterRoutingKey } from '../../../common';

export class MessageRepliedEventMessage {
  chatId: string;
  createdAt: Date;
  messageId: string;
  repliedTo: {
    chatId: string;
    createdAt: Date;
    messageId: string;
    text: string;
  };

  text: string;
}

export abstract class MessageRepliedEventInterface {
  static config = {
    exchange: Exchange.topic,
    routingKey: TwitterRoutingKey.messageReplied,
  };

  public abstract execute(input: MessageRepliedEventMessage, msg?: ConsumeMessage): Promise<void>;
}
