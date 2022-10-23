import { UserAvatarDomainModel } from './user-avatar.domain-model';

export class UserDomainModel {
  avatar?: UserAvatarDomainModel;

  createdAt: Date;

  email: string;

  firstName: string;

  readonly id!: string;

  lastName: string;

  password: string;

  phoneNumber?: string;

  updatedAt: Date;
}
