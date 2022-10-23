import { CurrentUser } from '@libs/auth';

export interface SignOutFromAllSessionsParameters {
  currentUser: CurrentUser;
}

export interface SignOutParameters {
  currentUser: CurrentUser;
  refreshToken: string;
}
