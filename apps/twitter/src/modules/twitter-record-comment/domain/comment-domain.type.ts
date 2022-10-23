import { FileUpload } from '@jebulday/aws';

export interface CreateCommentParameters {
  commentedRecordAuthorId: string;
  commentedRecordId: string;
  images: FileUpload[];
  userId: string;
}

export interface DeleteCommentByIdParameters {
  commentId: string;
  userId: string;
}

export interface GetCommentsByTweetIdParameters {
  tweetId: string;
}
