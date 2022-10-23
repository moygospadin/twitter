import { PrivacyInfo } from '@libs/auth';

export interface SignInParameters {
  email: string;
  password: string;
  userPrivacyInfo: PrivacyInfo;
}
