import { Injectable, Module } from '@nestjs/common';
import { PubSub as LocalPubSub } from 'graphql-subscriptions';

@Injectable()
export class PubSub extends LocalPubSub {}

@Module({
  controllers: [],
  exports: [PubSub],
  imports: [],
  providers: [PubSub],
})
export class PubSubModule {}
