import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatSubscriptionDto {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  name: string;
}
