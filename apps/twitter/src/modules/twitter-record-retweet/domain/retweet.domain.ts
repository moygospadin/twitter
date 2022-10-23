import { Inject, Injectable } from '@nestjs/common';

import { TWITTER_RECORD_REPOSITORY_TOKEN } from '../../twitter-record/core/tokens';

import { RetweetRepositoryInterface } from './repository-interfaces';
import { CreateRetweetParameters, DeleteRetwwetByIdParameters, GetRetweetsByUserIdParameters } from './retweet-domain.type';

@Injectable()
export class RetweetDomain {
  constructor(@Inject(TWITTER_RECORD_REPOSITORY_TOKEN) private readonly retweetRepository: RetweetRepositoryInterface) {}

  public async createRetweet({ retweetedRecordAuthorId, retweetedRecordId, userId }: CreateRetweetParameters) {
    const createdAt = new Date();

    return this.retweetRepository.addRetweet({
      createdAt,
      retweetedRecordAuthorId,
      retweetedRecordId,
      updatedAt: createdAt,
      userId,
    });
  }

  public async deleteRetwwetById({ retweetId, userId }: DeleteRetwwetByIdParameters) {
    await this.retweetRepository.deleteRetweetById({ retweetId, userId });
  }

  public async getRetweetsByUserId({ userId }: GetRetweetsByUserIdParameters) {
    return this.retweetRepository.getRetweetsByUserId({ userId });
  }
}
