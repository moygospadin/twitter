import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { CurrentUser, CurrentUserArgs, GqlAuthGuard } from '@libs/auth';

import { UserDomain } from '../domain';

import { UserDto } from './dtos';
import { MeResult } from './results';

@Resolver(() => UserDto)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userDomain: UserDomain) {}

  @Query(() => MeResult)
  public async me(@CurrentUserArgs() currentUser: CurrentUser): Promise<MeResult> {
    const { userId } = currentUser;

    const data = await this.userDomain.getUserById({ userId });

    return { data };
  }
}
