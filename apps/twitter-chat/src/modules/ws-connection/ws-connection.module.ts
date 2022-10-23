import { Module } from '@nestjs/common';

import { WsConnectionService } from './application';
import { SessionCacheRepository, WsConnectionCacheRepository } from './infrastructure';

@Module({
  controllers: [],
  exports: [WsConnectionService],
  imports: [],
  providers: [SessionCacheRepository, WsConnectionCacheRepository, WsConnectionService],
})
export class WsConnectionModule {}
