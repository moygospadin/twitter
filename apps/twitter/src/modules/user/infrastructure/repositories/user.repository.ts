import { Injectable } from '@nestjs/common';

import { removeUndefinedValue } from '@libs/prisma';
import { PrismaTwitterClient } from '@libs/prisma/infrastructure/prisma-twitter.client';
import { InterfaceValidator } from '@typings';

import { UserAvatarDomainModel, UserDomainModel } from '../../domain/models';
import {
  AddParameters,
  FindByEmailParameters,
  FindByIdParameters,
  UpdateUserAvatarParameters,
  UpdateUserByIdParameters,
  UpdateUserPasswordByEmailParameters,
  UpdateUserPasswordByIdParameters,
  UserRepositoryInterface,
} from '../../domain/repository-interfaces';

@Injectable()
export class UserRepository implements InterfaceValidator<UserRepository, UserRepositoryInterface> {
  constructor(private readonly prismaClient: PrismaTwitterClient) {}

  public async add({
    createdAt,
    email,
    firstName,
    lastName,
    password,
    phoneNumber,
    updatedAt,
  }: AddParameters): Promise<UserDomainModel> {
    return this.prismaClient.users.create({
      data: {
        createdAt,
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        updatedAt,
      },
      include: {
        userAvatars: true,
      },
    });
  }

  public async findByEmail({ email }: FindByEmailParameters): Promise<UserDomainModel> {
    return this.prismaClient.users.findFirst({ where: { email } });
  }

  public async findById({ userId }: FindByIdParameters): Promise<UserDomainModel> {
    return this.prismaClient.users.findFirst({ where: { id: userId } });
  }

  public async updateUserAvatar({ key, url, userId }: UpdateUserAvatarParameters): Promise<UserAvatarDomainModel> {
    return this.prismaClient.userAvatars.update({ data: { key, url }, where: { userId } });
  }

  public async updateUserById({
    email,
    firstName,
    lastName,
    phoneNumber,
    userId,
  }: UpdateUserByIdParameters): Promise<UserDomainModel> {
    return this.prismaClient.users.update({
      data: { ...removeUndefinedValue({ email, firstName, lastName, phoneNumber }) },
      where: { id: userId },
    });
  }

  public async updateUserPasswordByEmail({ email, password }: UpdateUserPasswordByEmailParameters): Promise<UserDomainModel> {
    return this.prismaClient.users.update({ data: { password }, where: { email } });
  }

  public async updateUserPasswordById({ password, userId }: UpdateUserPasswordByIdParameters): Promise<UserDomainModel> {
    return this.prismaClient.users.update({ data: { password }, where: { id: userId } });
  }
}
