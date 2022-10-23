import { Module } from '@nestjs/common';

import { TwitterRecordRetweetModule } from '../twitter-record-retweet';
import { TwitterRecordTweetModule } from '../twitter-record-tweet';

import { PageProfileService } from './application';
import { PageProfileResolver } from './presentation';

@Module({
  controllers: [],
  exports: [],
  imports: [TwitterRecordRetweetModule, TwitterRecordTweetModule],
  providers: [PageProfileService, PageProfileResolver],
})
export class PageProfileModule {}
