import { AwsService, FileUpload } from '@jebulday/aws';
import { Inject, Injectable } from '@nestjs/common';

import { TWITTER_RECORD_REPOSITORY_TOKEN } from '../../twitter-record/core/tokens';

import { TweetRepositoryInterface } from './repository-interfaces';
import { CreateTweetParameters, DeleteTweetByIdParameters, GetUserTweetsParameters } from './tweet-domain.type';

@Injectable()
export class TweetDomain {
  constructor(
    private readonly awsService: AwsService,
    @Inject(TWITTER_RECORD_REPOSITORY_TOKEN) private readonly tweetRepository: TweetRepositoryInterface,
  ) {}

  private uploadTweetImages(files: FileUpload[], userId: string) {
    if (!files.length) {
      return [];
    }

    return Promise.all(
      files.map(async (file) => this.awsService.putFile({ file, subPath: `users/${userId}/twitter-record/tweets/` })),
    );
  }

  public async createTweet({ images, text, userId }: CreateTweetParameters) {
    const createdAt = new Date();

    const uploadedImages = await this.uploadTweetImages(images, userId);

    return this.tweetRepository.addTweet({
      createdAt,
      images: uploadedImages,
      text,
      updatedAt: createdAt,
      userId,
    });
  }

  public async deleteTweetById({ tweetId, userId }: DeleteTweetByIdParameters) {
    await this.tweetRepository.deleteTweetById({ tweetId, userId });
  }

  public async getTweetsByUserId({ userId }: GetUserTweetsParameters) {
    return this.tweetRepository.getTweetsByUserId({ userId });
  }
}
