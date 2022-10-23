import { Module } from '@nestjs/common';

import { TwitterRecordModule } from '../twitter-record';

import { RetweetService } from './application';
import { RetweetDomain } from './domain';
import { RetweetResolver } from './presentation';

@Module({
  controllers: [],
  exports: [RetweetDomain],
  imports: [TwitterRecordModule],
  providers: [RetweetDomain, RetweetResolver, RetweetService],
})
export class TwitterRecordRetweetModule {}
