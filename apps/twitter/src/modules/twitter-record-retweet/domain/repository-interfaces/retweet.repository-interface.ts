import { RetweetDomnainModel } from '../models';

export interface RetweetRepositoryInterface {
  addRetweet(parameters: AddRetweetParameters): Promise<Omit<RetweetDomnainModel, 'retweetedTweet'>>;
  deleteRetweetById(parameters: DeleteRetweetByIdParameters): Promise<void>;
  getRetweetsByUserId(parameters: GetRetweetsByUserIdParameters): Promise<RetweetDomnainModel[]>;
}

export interface AddRetweetParameters {
  createdAt: Date;
  retweetedRecordAuthorId: string;
  retweetedRecordId: string;
  updatedAt: Date;
  userId: string;
}

export interface DeleteRetweetByIdParameters {
  retweetId: string;
  userId: string;
}

export interface GetRetweetsByUserIdParameters {
  userId: string;
}
