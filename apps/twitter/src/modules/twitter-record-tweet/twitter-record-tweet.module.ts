import { Module } from '@nestjs/common';

import { TwitterRecordModule } from '../twitter-record';

import { TweetService } from './appliction';
import { TweetDomain } from './domain';
import { TweetResolver } from './presentation';

@Module({
  controllers: [],
  exports: [TweetDomain],
  imports: [TwitterRecordModule],
  providers: [TweetDomain, TweetResolver, TweetService],
})
export class TwitterRecordTweetModule {}
