import { TweetImageDomainModel } from './tweet-image.domain-model';

export class TweetDomnainModel {
  createdAt: Date;
  id: string;
  images: TweetImageDomainModel[];
  text: string;
  updatedAt: Date;
  userId: string;
}
