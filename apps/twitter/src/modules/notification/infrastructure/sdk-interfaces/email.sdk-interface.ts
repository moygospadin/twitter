export interface EmailSdkInterface {
  sendSignUpEmailConfirmationNotification(parameters: SendSignUpEmailConfirmationNotificationParameters): Promise<void>;
}

export interface SendSignUpEmailConfirmationNotificationParameters {
  email: string;
  firstName: string;
  otp: string;
}
