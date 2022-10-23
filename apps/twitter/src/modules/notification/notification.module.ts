import { EmailjsModule } from '@jebulday/emailjs';
import { Module } from '@nestjs/common';

import { EmailjsConfigService } from '../../config';

import { EMAIL_SDK_TOKEN } from './core/tokens';
import { EmailNotificationDomain } from './domain';
import { EmailSdk } from './infrastructure/sdk';

@Module({
  controllers: [],
  exports: [EmailNotificationDomain],
  imports: [EmailjsModule.registerAsync({ useClass: EmailjsConfigService })],
  providers: [{ provide: EMAIL_SDK_TOKEN, useClass: EmailSdk }, EmailNotificationDomain],
})
export class NotificationModule {}
