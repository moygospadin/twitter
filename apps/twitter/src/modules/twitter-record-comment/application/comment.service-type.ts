import { FileUpload } from '@jebulday/aws';

import { CurrentUser } from '@libs/auth';

export interface CreateCommentParameters {
  commentedRecordAuthorId: string;
  commentedRecordId: string;
  currentUser: CurrentUser;
  images: FileUpload[];
}

export interface DeleteCommentByIdParameters {
  commentId: string;
  currentUser: CurrentUser;
}

export interface GetCommentsByTweetIdParameters {
  currentUser: CurrentUser;
  tweetId: string;
}
