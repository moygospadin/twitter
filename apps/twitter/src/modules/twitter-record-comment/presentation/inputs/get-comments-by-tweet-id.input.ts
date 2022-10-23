import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetCommentsByTweetIdInput {
  @Field(() => String, { nullable: false })
  tweetId: string;
}
