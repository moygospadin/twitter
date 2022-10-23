import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { PrivacyInfo, PrivacyInfoArgs } from '@libs/auth';

import { CookieService } from '../../auth-core/application';
import { SignInService } from '../application';
import { SignInGuard } from '../core/guards';

import { SignInInput } from './inputs';
import { SignInResult } from './results';

@Resolver()
export class SignInResolver {
  constructor(private readonly cookieService: CookieService, private readonly signInService: SignInService) {}

  @Mutation(() => SignInResult, { description: 'Not protected' })
  @UseGuards(SignInGuard)
  public async signIn(
    @Args('input') input: SignInInput,
    @Context() { res }: GraphqlContext,
    @PrivacyInfoArgs() { ip, userAgent }: PrivacyInfo,
  ): Promise<SignInResult> {
    const { email, password } = input;

    const { refreshToken, sessionId } = await this.signInService.signIn({
      email,
      password,
      userPrivacyInfo: { ip, userAgent },
    });

    this.cookieService.setCookie(sessionId, refreshToken, res);

    return { error: null };
  }
}
