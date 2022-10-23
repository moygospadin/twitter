import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatRepliedMessageDto {
  @Field(() => String, { nullable: false })
  chatId: string;

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => ChatRepliedMessageDto, { nullable: false })
  repliedTo: ChatRepliedMessageDto;

  @Field(() => String, { nullable: false })
  text: string;

  @Field(() => Date, { nullable: false })
  updatedAt: Date;

  @Field(() => String, { nullable: false })
  userId: string;
}
