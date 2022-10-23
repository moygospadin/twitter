import { Service, Template, EmailClient } from '@jebulday/emailjs';
import { Injectable } from '@nestjs/common';

import { InterfaceValidator } from '@typings';

import { EmailSdkInterface, SendSignUpEmailConfirmationNotificationParameters } from '../sdk-interfaces';

@Injectable()
export class EmailSdk implements InterfaceValidator<EmailSdk, EmailSdkInterface> {
  constructor(private readonly emailClient: EmailClient) {}

  public async sendSignUpEmailConfirmationNotification({
    email,
    firstName,
    otp,
  }: SendSignUpEmailConfirmationNotificationParameters): Promise<void> {
    // await this.emailClient.send(Service.yandex, Template.signUp, {
    //   oneTimePassword: otp,
    //   receiverEmail: email,
    //   receiverName: firstName,
    // });
  }
}
