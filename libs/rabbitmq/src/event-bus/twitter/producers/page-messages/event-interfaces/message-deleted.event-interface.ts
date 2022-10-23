import { ConsumeMessage } from 'amqplib';

import { Exchange } from '../../../../../core';
import { TwitterRoutingKey } from '../../../common';

export class MessageDeletedEventMessage {
  chatId: string;
  messageId: string;
}

export abstract class MessageDeletedEventInterface {
  static config = {
    exchange: Exchange.topic,
    routingKey: TwitterRoutingKey.messageDeleted,
  };

  public abstract execute(input: MessageDeletedEventMessage, msg?: ConsumeMessage): Promise<void>;
}
