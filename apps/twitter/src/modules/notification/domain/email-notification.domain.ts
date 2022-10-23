import { Inject, Injectable } from '@nestjs/common';

import { EMAIL_SDK_TOKEN } from '../core/tokens';
import { EmailSdkInterface } from '../infrastructure';

import { SendSignUpEmailConfirmationNotificationParameters } from './email-notification.domain-type';

@Injectable()
export class EmailNotificationDomain {
  constructor(@Inject(EMAIL_SDK_TOKEN) private readonly emailSdk: EmailSdkInterface) {}

  public async sendSignUpEmailConfirmationNotification({ email, firstName, otp }: SendSignUpEmailConfirmationNotificationParameters) {
    await this.emailSdk.sendSignUpEmailConfirmationNotification({ email, firstName, otp });
  }
}
