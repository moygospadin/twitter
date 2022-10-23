import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { PrivacyInfo, PrivacyInfoArgs } from '@libs/auth';

import { CookieService } from '../../auth-core/application';
import { SignUpService } from '../application';

import { SignUpDto } from './dtos';
import { RequestSignUpInput, ReRequestSignUpInput, SignUpInput } from './inputs';
import { RequestSignUpResult, ReRequestSignUpResult, SignUpResult } from './results';

@Resolver(() => SignUpDto)
export class SignUpResolver {
  constructor(private readonly cookieService: CookieService, private readonly signUpService: SignUpService) {}

  @Mutation(() => ReRequestSignUpResult, { description: 'Not protected' })
  public async reRequestSignUp(@Args('input') input: ReRequestSignUpInput): Promise<ReRequestSignUpResult> {
    const { email } = input;

    await this.signUpService.reRequestSignUp({ email });

    return { error: null };
  }

  @Mutation(() => RequestSignUpResult, { description: 'Not protected' })
  public async requestSignUp(@Args('input') input: RequestSignUpInput): Promise<RequestSignUpResult> {
    const { email, firstName, lastName, password, repeatPassword } = input;

    await this.signUpService.requestSignUp({
      email: email.toLowerCase(),
      firstName,
      lastName,
      password,
      repeatPassword,
    });

    return { error: null };
  }

  @Mutation(() => SignUpResult, { description: 'Not protected' })
  public async signUp(
    @Args('input') input: SignUpInput,
    @Context() { res }: GraphqlContext,
    @PrivacyInfoArgs() { ip, userAgent }: PrivacyInfo,
  ): Promise<SignUpResult> {
    const { email, otp } = input;

    const { refreshToken, sessionId } = await this.signUpService.signUp({
      email,
      otp,
      userPrivacyInfo: { ip, userAgent },
    });

    this.cookieService.setCookie(sessionId, refreshToken, res);

    return { error: null };
  }
}
