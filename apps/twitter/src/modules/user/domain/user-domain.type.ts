import { FileData } from '@jebulday/aws';

export interface CreateUserParameters {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface GetUserByEmailParameters {
  email: string;
}

export interface GetUserByIdParameters {
  userId: string;
}

export interface UpdateUserAvatarParameters {
  file: FileData;
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
