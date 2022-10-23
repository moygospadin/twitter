import { MimeType } from '@jebulday/aws';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { CurrentUser, CurrentUserArgs, GqlAuthGuard } from '@libs/auth';
import { FileUploadValidationPipe } from 'libs/graphql/src/presentation/pipes';

import { UserAccountService } from '../application';

import { ChangePasswordInput, UpdateAccountInput } from './inputs';
import { ChangePasswordResult, GetActiveSessionsResult, UpdateAccountResult, UpdateAvatarResult } from './results';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserAccountResolver {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Mutation(() => ChangePasswordResult)
  public async changePassword(
    @Args('input') input: ChangePasswordInput,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<ChangePasswordResult> {
    const { password, repeatPassword } = input;

    await this.userAccountService.changePassword({ currentUser, password, repeatPassword });

    return { error: null };
  }

  @Query(() => GetActiveSessionsResult)
  public async getActiveSessions(@CurrentUserArgs() currentUser: CurrentUser): Promise<GetActiveSessionsResult> {
    const data = await this.userAccountService.getActiveSessions({ currentUser });

    return { data };
  }

  @Mutation(() => UpdateAccountResult)
  public async updateAccount(
    @Args('input') input: UpdateAccountInput,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<UpdateAccountResult> {
    const { email, firstName, lastName, phoneNumber } = input;

    const data = await this.userAccountService.updateAccount({
      currentUser,
      email,
      firstName,
      lastName,
      phoneNumber,
    });

    return { data };
  }

  @Mutation(() => UpdateAvatarResult)
  public async updateAvatar(
    @Args(
      { name: 'avatar', type: () => GraphQLUpload },
      new FileUploadValidationPipe({ allowedMimeTypes: [MimeType.png, MimeType.jpeg, MimeType.jpg] }),
    )
    avatar: FileUpload,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<UpdateAvatarResult> {
    const data = await this.userAccountService.updateAvatar({ avatar, currentUser });

    return { data };
  }
}
