import { FileData } from '@jebulday/aws';

export class TweetImageDomainModel implements FileData {
  id: string;
  key: string;
  url: string;
}
