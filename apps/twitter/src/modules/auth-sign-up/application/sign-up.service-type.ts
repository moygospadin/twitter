import { PrivacyInfo } from '@libs/auth';

export interface ReRequestSignUpParameters {
  email: string;
}

export interface RequestSignUpParameters {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
}

export interface SignUpParameters {
  email: string;
  otp: string;
  userPrivacyInfo: PrivacyInfo;
}
