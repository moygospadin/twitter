import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

import { RetweetDto } from '../../../twitter-record-retweet/presentation/dtos';
import { TweetDto } from '../dtos';
import { GetMyTweetsError } from '../errors';

const GetMyTweetsResultData = createUnionType({
  name: 'GetMyTweetsResultData',
  resolveType: (value) => {
    if (value.retweetedTweet) {
      return 'RetweetDto';
    }

    return 'TweetDto';
  },
  types: () => [TweetDto, RetweetDto] as const,
});

@ObjectType()
export class GetMyTweetsResult {
  @Field(() => [GetMyTweetsResultData], { nullable: true })
  data?: (TweetDto | RetweetDto)[];

  @Field(() => GetMyTweetsError, { nullable: true })
  error?: GetMyTweetsError;
}
