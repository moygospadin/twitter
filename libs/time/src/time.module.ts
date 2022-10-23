import { Module, Global } from '@nestjs/common';

import { TimeService } from './application';

@Global()
@Module({
  controllers: [],
  exports: [TimeService],
  imports: [],
  providers: [TimeService],
})
export class TimeModule {}
