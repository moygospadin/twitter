import { UserAvatarDomainModel, UserDomainModel } from '../models';

export interface UserRepositoryInterface {
  add(parameters: AddParameters): Promise<UserDomainModel>;
  findByEmail(parameters: FindByEmailParameters): Promise<UserDomainModel>;
  findById(parameters: FindByIdParameters): Promise<UserDomainModel>;
  updateUserAvatar(parameters: UpdateUserAvatarParameters): Promise<UserAvatarDomainModel>;
  updateUserById(parameters: UpdateUserByIdParameters): Promise<UserDomainModel>;
  updateUserPasswordByEmail(parameters: UpdateUserPasswordByEmailParameters): Promise<UserDomainModel>;
  updateUserPasswordById(parameters: UpdateUserPasswordByIdParameters): Promise<UserDomainModel>;
}

export interface AddParameters extends Omit<UserDomainModel, 'id' | 'avatar'> {}

export interface FindByEmailParameters {
  email: string;
}

export interface FindByIdParameters {
  userId: string;
}

export interface UpdateUserAvatarParameters {
  key: string;
  url: string;
  userId: string;
}

export interface UpdateUserByIdParameters {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  userId: string;
}

export interface UpdateUserPasswordByEmailParameters {
  email: string;
  password: string;
}

export interface UpdateUserPasswordByIdParameters {
  password: string;
  userId: string;
}
