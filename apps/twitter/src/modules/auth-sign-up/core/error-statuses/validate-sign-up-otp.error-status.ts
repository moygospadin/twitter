export enum ValidateSignUpOtpErrorStatus {
  expired = 'expired',
  invalidOtp = 'invalidOtp',
}

export type ValidateSignUpOtpError = keyof typeof ValidateSignUpOtpErrorStatus;
