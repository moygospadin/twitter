import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatMessageInput {
  @Field(() => String, { nullable: false })
  chatId: string;

  @Field(() => String, { nullable: false })
  text: string;
}
