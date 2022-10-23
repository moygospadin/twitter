import { UserSessionDomainModel } from '../models';

export interface UserSessionRepositoryInterface {
  add(parameters: Omit<UserSessionDomainModel, 'id'>): Promise<UserSessionDomainModel>;
  deleteById(parameters: DeleteByIdParameters): Promise<void>;
  deleteMultipleByUserIdAndGet(parameters: DeleteMultipleByUserIdAndGetParameters): Promise<UserSessionDomainModel[]>;
  deleteOldestSession(parameters: DeleteOldestSessionParameters): Promise<void>;
  findMultipleByUserId(parameters: FindMultipleByUserIdParameters): Promise<UserSessionDomainModel[]>;
  getCountByUserId(parameters: GetCountByUserIdParameters): Promise<number>;
}

export interface DeleteByIdParameters {
  sessionId: string;
}

export interface DeleteMultipleByUserIdAndGetParameters {
  userId: string;
}

export interface DeleteOldestSessionParameters {
  userId: string;
}

export interface FindMultipleByUserIdParameters {
  userId: string;
}

export interface GetCountByUserIdParameters {
  userId: string;
}
