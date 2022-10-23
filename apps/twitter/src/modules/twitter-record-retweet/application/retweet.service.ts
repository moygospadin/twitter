import { Injectable } from '@nestjs/common';

import { RetweetDomain } from '../domain';

import { CreateRetweetParameters, DeleteRetwwetByIdParameters } from './retweet.service-type';

@Injectable()
export class RetweetService {
  constructor(private readonly retweetDomain: RetweetDomain) {}

  public async createRetweet({ currentUser, retweetedRecordAuthorId, retweetedRecordId }: CreateRetweetParameters) {
    const { userId } = currentUser;

    return this.retweetDomain.createRetweet({
      retweetedRecordAuthorId,
      retweetedRecordId,
      userId,
    });
  }

  public async deleteRetwwetById({ currentUser, retweetId }: DeleteRetwwetByIdParameters) {
    const { userId } = currentUser;

    await this.retweetDomain.deleteRetwwetById({ retweetId, userId });
  }
}
