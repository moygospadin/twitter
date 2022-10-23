import { Module } from '@nestjs/common';

import { AuthSessionModule } from '../auth-session';
import { UserModule } from '../user';

import { UserAccountService } from './application';
import { UserAccountResolver } from './presentation';

@Module({
  controllers: [],
  exports: [],
  imports: [AuthSessionModule, UserModule],
  providers: [UserAccountResolver, UserAccountService],
})
export class UserAccountModule {}
