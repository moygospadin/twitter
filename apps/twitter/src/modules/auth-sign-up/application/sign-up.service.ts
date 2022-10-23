import { Injectable } from '@nestjs/common';

import { BadRequestException, NotFoundException } from '@libs/exceptions';

import { RefreshTokenDomain } from '../../auth-refresh-token/domain';
import { SessionDomain } from '../../auth-session/domain';
import { SignUpValidationRequestedEeEvent, UserCreatedEeEvent } from '../../event-emitter/outbound/event';
import { UserDomain } from '../../user/domain';
import { SignUpDomain } from '../domain';

import { RequestSignUpParameters, ReRequestSignUpParameters, SignUpParameters } from './sign-up.service-type';

@Injectable()
export class SignUpService {
  private signUpErrorContext = 'Sign up';

  constructor(
    private readonly refreshTokenDomain: RefreshTokenDomain,
    private readonly sessionDomain: SessionDomain,
    private readonly signUpDomain: SignUpDomain,
    private readonly signUpValidationRequestedEeEvent: SignUpValidationRequestedEeEvent,
    private readonly userCreatedEeEvent: UserCreatedEeEvent,
    private readonly userDomain: UserDomain,
  ) {}

  public async reRequestSignUp({ email }: ReRequestSignUpParameters) {
    const signUpValidation = await this.signUpDomain.getSignUpValidation({ email });

    if (!signUpValidation) {
      throw new NotFoundException(this.signUpErrorContext, 'Active sign up session not found');
    }

    const { firstName, otp } = await this.signUpDomain.updateSignUpValidationOtpAndExpiredAtTime(signUpValidation);

    await this.signUpValidationRequestedEeEvent.execute({ email, firstName, otp });
  }

  public async requestSignUp({ email, firstName, lastName, password, repeatPassword }: RequestSignUpParameters) {
    const user = await this.userDomain.getUserByEmail({ email });

    if (user) {
      throw new BadRequestException(this.signUpErrorContext, 'Email already exists');
    }

    if (password !== repeatPassword) {
      throw new BadRequestException(this.signUpErrorContext, 'Repeat password did not match');
    }

    const { otp } = await this.signUpDomain.createSignUpValidation({ email, firstName, lastName, password });

    await this.signUpValidationRequestedEeEvent.execute({ email, firstName, otp });
  }

  public async signUp({ email, otp, userPrivacyInfo }: SignUpParameters) {
    const signUpValidation = await this.signUpDomain.getSignUpValidation({ email });

    if (!signUpValidation) {
      throw new NotFoundException(this.signUpErrorContext, 'Active sign up session not found');
    }

    const validateSignUpOtpResult = await this.signUpDomain.validateSignUpValidation(signUpValidation, otp);

    if (validateSignUpOtpResult === 'expired') {
      throw new BadRequestException(this.signUpErrorContext, 'Session expired');
    }

    if (validateSignUpOtpResult === 'invalidOtp') {
      throw new BadRequestException(this.signUpErrorContext, 'Invalid one time password');
    }

    const { firstName, lastName, password } = signUpValidation;
    const { userAgent } = userPrivacyInfo;

    const createdUser = await this.userDomain.createUser({ email, firstName, lastName, password });

    await this.userCreatedEeEvent.execute({ email, firstName, lastName, userAgent });

    const { id: userId } = createdUser;

    const { refreshToken } = await this.refreshTokenDomain.createRefreshToken({ userId });
    const { sessionId } = await this.sessionDomain.createSession({ userId, userPrivacyInfo });

    await this.signUpDomain.deleteSignUpValidation({ email });

    return { refreshToken, sessionId };
  }
}
