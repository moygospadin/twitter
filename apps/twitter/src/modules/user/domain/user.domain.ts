import { Inject, Injectable } from '@nestjs/common';

import { UserCreatedEeEvent } from '../../event-emitter/outbound/event';
import { USER_REPOSITORY_TOKEN } from '../core/tokens';

import { UserRepositoryInterface } from './repository-interfaces';
import {
  CreateUserParameters,
  GetUserByEmailParameters,
  GetUserByIdParameters,
  UpdateUserAvatarParameters,
  UpdateUserByIdParameters,
  UpdateUserPasswordByEmailParameters,
  UpdateUserPasswordByIdParameters,
} from './user-domain.type';

@Injectable()
export class UserDomain {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface,
    private readonly userCreatedEeEvent: UserCreatedEeEvent,
  ) {}

  public async createUser({ email, firstName, lastName, password }: CreateUserParameters) {
    const createdAt = new Date();

    const createdUser = await this.userRepository.add({
      createdAt,
      email,
      firstName,
      lastName,
      password,
      phoneNumber: null,
      updatedAt: createdAt,
    });

    this.userCreatedEeEvent.execute({ userId: createdUser.id });

    return createdUser;
  }

  public async getUserByEmail({ email }: GetUserByEmailParameters) {
    return this.userRepository.findByEmail({ email });
  }

  public async getUserById({ userId }: GetUserByIdParameters) {
    return this.userRepository.findById({ userId });
  }

  public async updateUserAvatar({ file, userId }: UpdateUserAvatarParameters) {
    const { key, url } = file;

    return this.userRepository.updateUserAvatar({
      key,
      url,
      userId,
    });
  }

  public async updateUserById({ email, firstName, lastName, phoneNumber, userId }: UpdateUserByIdParameters) {
    return this.userRepository.updateUserById({
      email,
      firstName,
      lastName,
      phoneNumber,
      userId,
    });
  }

  public async updateUserPasswordByEmail({ email, password }: UpdateUserPasswordByEmailParameters) {
    return this.userRepository.updateUserPasswordByEmail({ email, password });
  }

  public async updateUserPasswordById({ password, userId }: UpdateUserPasswordByIdParameters) {
    return this.userRepository.updateUserPasswordById({ password, userId });
  }
}
