import { Inject, Injectable } from '@nestjs/common';

import { RESET_PASSWORD_VALIDATION_REPOSITORY_TOKEN } from '../core/tokens';
import { ResetPasswordValidationCacheRepositoryInterface } from '../infrastructure';

@Injectable()
export class ResetPasswordDomain {
  constructor(
    @Inject(RESET_PASSWORD_VALIDATION_REPOSITORY_TOKEN)
    private readonly resetPasswordValidationRepository: ResetPasswordValidationCacheRepositoryInterface,
  ) {}

  // public async createResetPasswordValidation({  }: CreateResetPasswordValidationParameters) {
  //   return this.resetPasswordValidationRepository.create({
  //     key: '',
  //     ttlMilliseconds: this.resetPasswordValidationLifetimeInMilliseconds,
  //     value: { email: '', expiredAt: new Date(), token: '' },
  //   });
  // }
}
