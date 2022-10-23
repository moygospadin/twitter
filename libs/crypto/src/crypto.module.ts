import { Module, Global } from '@nestjs/common';

import { HashService, UniqueIdGeneratorService } from './application';

@Global()
@Module({
  controllers: [],
  exports: [HashService, UniqueIdGeneratorService],
  imports: [],
  providers: [HashService, UniqueIdGeneratorService],
})
export class CryptoModule {}
