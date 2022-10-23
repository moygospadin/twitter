import { Inject, Injectable } from '@nestjs/common';

import { HashService, UniqueIdGeneratorService } from '@libs/crypto';
import { TimeService } from '@libs/time';

import { ValidateSignUpOtpError, ValidateSignUpOtpErrorStatus } from '../core/error-statuses';
import { SIGN_UP_VALIDATION_REPOSITORY_TOKEN } from '../core/tokens';

import { SignUpValidationDomainModel } from './models';
import { SignUpValidationCacheRepositoryInterface } from './repository-interfaces';
import {
  CreateSignUpValidationParameters,
  DeleteSignUpValidationParameters,
  GetSignUpValidationParameters,
} from './sign-up.domain-type';

@Injectable()
export class SignUpDomain {
  private readonly lifetimeOfSignUpValidationInMilliseconds = 60 * 60 * 1 * 1000;

  constructor(
    private readonly hashService: HashService,
    @Inject(SIGN_UP_VALIDATION_REPOSITORY_TOKEN)
    private readonly signUpValidationCacheRepository: SignUpValidationCacheRepositoryInterface,
    private readonly timeService: TimeService,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
  ) {}

  public async createSignUpValidation({ email, firstName, lastName, password }: CreateSignUpValidationParameters) {
    const hashedPassword = await this.hashService.hash(password);

    const expiresAt = this.timeService.addMilliseconds(new Date(), this.lifetimeOfSignUpValidationInMilliseconds);
    const otp = await this.uniqueIdGeneratorService.generateIdContaining6Chars();

    await this.signUpValidationCacheRepository.set({
      email,
      expiresAt,
      firstName,
      lastName,
      otp,
      password: hashedPassword,
    });

    return { otp };
  }

  public async deleteSignUpValidation({ email }: DeleteSignUpValidationParameters) {
    await this.signUpValidationCacheRepository.delete({ email });
  }

  public async getSignUpValidation({ email }: GetSignUpValidationParameters) {
    return this.signUpValidationCacheRepository.get({ email });
  }

  public async updateSignUpValidationOtpAndExpiredAtTime(signUpValidation: SignUpValidationDomainModel) {
    const expiresAt = this.timeService.addMilliseconds(new Date(), this.lifetimeOfSignUpValidationInMilliseconds);
    const otp = await this.uniqueIdGeneratorService.generateIdContaining6Chars();

    await this.signUpValidationCacheRepository.set({ ...signUpValidation, expiresAt, otp });

    const { firstName } = signUpValidation;

    return { firstName, otp };
  }

  public async validateSignUpValidation(
    signUpValidation: SignUpValidationDomainModel,
    receivedOtp: string,
  ): Promise<ValidateSignUpOtpError> {
    const { expiresAt, otp } = signUpValidation;

    const isValidationExpired = this.timeService.isBefore(expiresAt, new Date());

    if (isValidationExpired) {
      return ValidateSignUpOtpErrorStatus.expired;
    }

    if (otp !== receivedOtp) {
      return ValidateSignUpOtpErrorStatus.invalidOtp;
    }
  }
}
