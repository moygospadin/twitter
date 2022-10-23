import { Injectable } from '@nestjs/common';

import { TweetDomain } from '../domain';

import {
  CreateTweetParameters,
  DeleteTweetByIdParameters,
  GetMyTweetsParameters,
  GetUserTweetsParameters,
} from './tweet-service.type';

@Injectable()
export class TweetService {
  constructor(private readonly tweetDomain: TweetDomain) {}

  public async createTweet({ currentUser, images, text }: CreateTweetParameters) {
    const { userId } = currentUser;

    return this.tweetDomain.createTweet({ images, text, userId });
  }

  public async deleteTweetById({ currentUser, tweetId }: DeleteTweetByIdParameters) {
    const { userId } = currentUser;

    await this.tweetDomain.deleteTweetById({ tweetId, userId });
  }

  public async getMyTweets({ currentUser }: GetMyTweetsParameters) {
    const { userId } = currentUser;

    return;

    // return this.tweetDomain.getUserTweetsAndRetweets({ userId });
  }

  public async getUserTweets({ currentUser }: GetUserTweetsParameters) {
    const { userId } = currentUser;

    return;

    // return this.tweetDomain.getUserTweetsAndRetweets({ userId });
  }
}
