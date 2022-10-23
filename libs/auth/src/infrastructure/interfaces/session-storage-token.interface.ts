import { CurrentUser } from '../../core';

export interface SessionStorageInterface {
  getSession(parameters: GetSessionParameters): Promise<CurrentUser>;
}

export interface GetSessionParameters {
  sessionId: string;
}
