import { Module } from '@nestjs/common';

import { TwitterRecordModule } from '../twitter-record';

import { CommentService } from './application';
import { CommentDomain } from './domain';
import { CommentResolver } from './presentation';

@Module({
  controllers: [],
  exports: [],
  imports: [TwitterRecordModule],
  providers: [CommentDomain, CommentResolver, CommentService],
})
export class TwitterRecordCommentModule {}
