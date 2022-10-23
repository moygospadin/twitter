import { FileUpload } from 'graphql-upload';

import { CurrentUser } from '@libs/auth';

export interface ChangePasswordParameters {
  currentUser: CurrentUser;
  password: string;
  repeatPassword: string;
}

export interface GetActiveSessionsParameters {
  currentUser: CurrentUser;
}

export interface UpdateAccountParameters {
  currentUser: CurrentUser;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface UpdateUserAvatar {
  avatar: FileUpload;
  currentUser: CurrentUser;
}
