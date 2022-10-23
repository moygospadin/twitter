import { ConsumeMessage } from 'amqplib';

import { Exchange } from '../../../../../core';
import { TwitterRoutingKey } from '../../../common';

export class MessageUpdatedEventMessage {
  chatId: string;
  messageId: string;
  text: string;
}

export abstract class MessageUpdatedEventInterface {
  static config = {
    exchange: Exchange.topic,
    routingKey: TwitterRoutingKey.messageUpdated,
  };

  public abstract execute(input: MessageUpdatedEventMessage, msg?: ConsumeMessage): Promise<void>;
}
