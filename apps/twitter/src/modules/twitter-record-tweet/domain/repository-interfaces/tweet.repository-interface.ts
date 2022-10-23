import { TweetDomnainModel, TweetImageDomainModel } from '../models';

export interface TweetRepositoryInterface {
  addTweet(parameters: AddTweetParameters): Promise<TweetDomnainModel>;
  deleteTweetById(parameters: DeleteTweetByIdParameters): Promise<void>;
  getTweetsByUserId(parameters: GetTweetsByUserIdParameters): Promise<TweetDomnainModel[]>;
}

export interface AddTweetParameters extends Omit<TweetDomnainModel, 'id' | 'images' | 'parentId' | 'parentTweetUserId'> {
  images: Omit<TweetImageDomainModel, 'id'>[];
}

export interface DeleteTweetByIdParameters {
  tweetId: string;
  userId: string;
}

export interface GetTweetsByUserIdParameters {
  userId: string;
}
