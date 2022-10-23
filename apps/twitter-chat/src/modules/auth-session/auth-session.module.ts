import { Module } from '@nestjs/common';

import { SessionCacheRepository } from './infrastructure/repositories';

@Module({
  controllers: [],
  exports: [SessionCacheRepository],
  imports: [],
  providers: [SessionCacheRepository],
})
export class AuthSessionModule {}
