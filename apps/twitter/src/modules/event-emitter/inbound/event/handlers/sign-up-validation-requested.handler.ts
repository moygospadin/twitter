import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailNotificationDomain } from '../../../../notification/domain';
import { EventName } from '../../../common';
import { SignUpValidationRequestedMessage } from '../message';

@Injectable()
export class SignUpValidationRequestedEeEventHandler {
  constructor(private readonly emailNotificationDomain: EmailNotificationDomain) {}

  @OnEvent(EventName.signUpValidationRequested)
  public async handleSignUpValidationRequested({ email, firstName, otp }: SignUpValidationRequestedMessage): Promise<void> {
    await this.emailNotificationDomain.sendSignUpEmailConfirmationNotification({ email, firstName, otp });
  }
}
