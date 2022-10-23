import { PrivacyInfo } from '@libs/auth';

export interface RefreshTokenParameters {
  refreshToken: string;
  sessionId: string;
  userPrivacyInfo: PrivacyInfo;
}
