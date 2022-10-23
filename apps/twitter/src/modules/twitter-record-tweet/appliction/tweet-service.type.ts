import { FileUpload } from '@jebulday/aws';

import { CurrentUser } from '@libs/auth';

export interface CreateTweetParameters {
  currentUser: CurrentUser;
  images: FileUpload[];
  text: string;
}

export interface DeleteTweetByIdParameters {
  currentUser: CurrentUser;
  tweetId: string;
}

export interface GetMyTweetsParameters {
  currentUser: CurrentUser;
}

export interface GetUserTweetsParameters {
  currentUser: CurrentUser;
  userId: string;
}
