import { FileUpload } from '@jebulday/aws';

export interface CreateTweetParameters {
  images: FileUpload[];
  text: string;
  userId: string;
}

export interface DeleteTweetByIdParameters {
  tweetId: string;
  userId: string;
}

export interface GetUserTweetsParameters {
  userId: string;
}
