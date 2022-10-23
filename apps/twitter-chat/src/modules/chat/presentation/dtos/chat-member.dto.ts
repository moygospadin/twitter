import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatMemberSubscriptionDto {
  @Field(() => String, { nullable: false })
  chatId: string;

  @Field(() => String, { nullable: false })
  userId: string;
}
