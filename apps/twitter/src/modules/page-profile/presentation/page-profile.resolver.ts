import { Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, CurrentUserArgs } from '@libs/auth';

import { PageProfileService } from '../application';

import { ProfileLikesResult, ProfileMediaResult, ProfileTweetsAndRepliesResult, ProfileTweetsResult } from './results';

@Resolver()
export class PageProfileResolver {
  constructor(private readonly pageProfileService: PageProfileService) {}

  @Query(() => ProfileLikesResult)
  public async profileLikes(@CurrentUserArgs() currentUser: CurrentUser): Promise<ProfileLikesResult> {
    return;
  }

  @Query(() => ProfileMediaResult)
  public async profileMedia(@CurrentUserArgs() currentUser: CurrentUser): Promise<ProfileMediaResult> {
    return;
  }

  @Query(() => ProfileTweetsAndRepliesResult)
  public async profileTweets(@CurrentUserArgs() currentUser: CurrentUser): Promise<ProfileTweetsAndRepliesResult> {
    return;
  }

  @Query(() => ProfileTweetsResult)
  public async profileTweetsAndReplies(@CurrentUserArgs() currentUser: CurrentUser): Promise<ProfileTweetsResult> {
    return;
  }
}
