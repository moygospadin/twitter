import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

import { RetweetDto } from '../../../twitter-record-retweet/presentation/dtos';
import { TweetDto } from '../dtos';
import { GetUserTweetsError } from '../errors';

const GetUserTweetsResultData = createUnionType({
  name: 'GetUserTweetsResultData',
  // resolveType: (value) => value,
  types: () => [TweetDto, RetweetDto] as const,
});

@ObjectType()
export class GetUserTweetsResult {
  @Field(() => [GetUserTweetsResultData], { nullable: true })
  data?: (TweetDto | RetweetDto)[];

  @Field(() => GetUserTweetsError, { nullable: true })
  error?: GetUserTweetsError;
}
