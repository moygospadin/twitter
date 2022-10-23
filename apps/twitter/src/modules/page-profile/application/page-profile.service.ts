import { Injectable } from '@nestjs/common';

import { RetweetDomain } from '../../twitter-record-retweet/domain';
import { TweetDomain } from '../../twitter-record-tweet/domain';

import { GetProfileTweetsParameters } from './page-profile.service-type';

@Injectable()
export class PageProfileService {
  constructor(private readonly retweetDomain: RetweetDomain, private readonly tweetDomain: TweetDomain) {
    (async () => {
      // await this.getProfileTweets({ userId: '3159f300-f1b0-4e63-b237-747685421d2f' });
    })();
  }

  public async getProfileTweets({ userId }: GetProfileTweetsParameters) {
    const retweets = await this.retweetDomain.getRetweetsByUserId({ userId });
    const tweets = await this.tweetDomain.getTweetsByUserId({ userId });

    const l = [...retweets, ...tweets].sort((previous, current) => previous.createdAt.getTime() - current.createdAt.getTime());

    console.dir({ l }, { depth: Infinity });

    return;
  }
}
