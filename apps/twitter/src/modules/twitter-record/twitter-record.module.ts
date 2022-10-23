import { Module } from '@nestjs/common';

import { TWITTER_RECORD_REPOSITORY_TOKEN } from './core/tokens';
import { TwitterRecordRepository } from './infrastructure';

@Module({
  controllers: [],
  exports: [TWITTER_RECORD_REPOSITORY_TOKEN],
  imports: [],
  providers: [{ provide: TWITTER_RECORD_REPOSITORY_TOKEN, useClass: TwitterRecordRepository }],
})
export class TwitterRecordModule {}
