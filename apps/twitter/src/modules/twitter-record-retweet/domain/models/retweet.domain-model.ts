import { RetweetImageDomainModel } from './retweet-image.domain-model';

export interface RetweetDomnainModel {
  createdAt: Date;
  id: string;
  retweetedTweet: {
    createdAt: Date;
    id: string;
    images: RetweetImageDomainModel[];
    text: string;
    updatedAt: Date;
    userId: string;
  };
  updatedAt: Date;
  userId: string;
}
