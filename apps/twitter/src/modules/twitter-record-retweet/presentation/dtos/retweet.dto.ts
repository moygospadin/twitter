import { Field, ObjectType } from '@nestjs/graphql';

import { TweetDto } from '../../../twitter-record-tweet/presentation/dtos';

@ObjectType()
export class RetweetDto {
  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => TweetDto, { nullable: false })
  retweetedTweet: TweetDto;

  @Field(() => Date, { nullable: false })
  updatedAt: Date;

  @Field(() => String, { nullable: false })
  userId: string;
}
