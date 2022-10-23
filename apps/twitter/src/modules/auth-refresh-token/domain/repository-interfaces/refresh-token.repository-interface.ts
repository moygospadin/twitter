import { RefreshTokenDomainModel } from '../models';

export interface RefreshTokenRepositoryInterface {
  add(parameters: Omit<RefreshTokenDomainModel, 'id'>): Promise<RefreshTokenDomainModel>;
  deleteById(parameters: DeleteByIdParameters): Promise<void>;
  deleteByUserId(parameters: DeleteByUserIdParameters): Promise<void>;
  deleteOldestRefreshToken(parameters: DeleteOldestRefreshTokenParameters): Promise<void>;
  findById(parameters: FindByIdParameters): Promise<RefreshTokenDomainModel>;
}

export interface DeleteByIdParameters {
  refreshTokenId: string;
}

export interface DeleteByUserIdParameters {
  userId: string;
}

export interface DeleteOldestRefreshTokenParameters {
  userId: string;
}

export interface FindByIdParameters {
  refreshTokenId: string;
}
