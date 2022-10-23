import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, CurrentUserArgs, GqlAuthGuard } from '@libs/auth';

import { TweetService } from '../appliction';

import { TweetDto } from './dtos';
import { GetUserTweetsInput } from './inputs';
import { GetMyTweetsResult, GetUserTweetsResult } from './results';

@Resolver(() => TweetDto)
@UseGuards(GqlAuthGuard)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @Query(() => GetMyTweetsResult)
  public async getMyTweets(@CurrentUserArgs() currentUser: CurrentUser): Promise<GetMyTweetsResult> {
    const data = await this.tweetService.getMyTweets({ currentUser });

    console.log('data - ', data);

    return { data: null };
  }

  @Query(() => GetUserTweetsResult)
  public async getUserTweetsByUserId(
    @Args('input') input: GetUserTweetsInput,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<GetUserTweetsResult> {
    const { userId } = input;

    const data = await this.tweetService.getUserTweets({ currentUser, userId });

    return { data: null };
  }
}
