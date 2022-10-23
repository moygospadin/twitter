import { createUnionType } from '@nestjs/graphql';

import { ChatMessageDto } from './chat-message.dto';
import { ChatRepliedMessageDto } from './chat-replied-message.dto';

export type ChatMessageSubscriptionDto = ChatMessageDto | ChatRepliedMessageDto;
export const chatMessageSubscriptionDto = createUnionType({
  name: 'ChatMessageSubscriptionDto',
  resolveType(value: ChatRepliedMessageDto) {
    console.log(value);

    if (value.repliedTo) {
      return ChatRepliedMessageDto;
    }

    return ChatMessageDto;
  },
  types: () => [ChatMessageDto, ChatRepliedMessageDto],
});
