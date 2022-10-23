import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReplyChatMessageInput {
  @Field(() => String, { nullable: false })
  chatId: string;

  @Field(() => String, { nullable: false })
  messageId: string;

  @Field(() => String, { nullable: false })
  text: string;
}
