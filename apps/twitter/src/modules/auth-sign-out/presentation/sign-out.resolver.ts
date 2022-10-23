import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser, CurrentUserArgs, GqlAuthGuard } from '@libs/auth';

import { CookieService } from '../../auth-core/application';
import { SignOutService } from '../application';

import { SignOutFromAllDevicesResult, SignOutResult } from './results';

@Resolver()
@UseGuards(GqlAuthGuard)
export class SignOutResolver {
  constructor(private readonly cookieService: CookieService, private readonly signOutService: SignOutService) {}

  @Mutation(() => SignOutResult)
  public async signOut(@Context() { req, res }: GraphqlContext, @CurrentUserArgs() currentUser: CurrentUser): Promise<SignOutResult> {
    const refreshToken = req.cookies.refreshToken;

    await this.signOutService.signOut({ currentUser, refreshToken });

    this.cookieService.clearCookie(res);

    return { error: null };
  }

  @Mutation(() => SignOutFromAllDevicesResult)
  public async signOutFromAllDevices(
    @Context() { res }: GraphqlContext,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<SignOutFromAllDevicesResult> {
    await this.signOutService.signOutFromAllDevices({ currentUser });

    this.cookieService.clearCookie(res);

    return { error: null };
  }
}
