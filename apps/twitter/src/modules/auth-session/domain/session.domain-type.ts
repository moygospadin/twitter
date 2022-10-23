import { PrivacyInfo } from '@libs/auth';

export interface CreateSessionParameters {
  userId: string;
  userPrivacyInfo: PrivacyInfo;
}

export interface DeleteAllUserSessionsParameters {
  userId: string;
}

export interface DeleteOldestUserSessionParameters {
  userId: string;
}

export interface DeleteSessionByIdParameters {
  sessionId: string;
}

export interface GetAllUserSessionsParameters {
  userId: string;
}

export interface IsSessionsActiveCountExceededParameters {
  userId: string;
}
