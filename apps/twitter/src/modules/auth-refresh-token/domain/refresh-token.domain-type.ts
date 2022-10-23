export interface CreateRefreshTokenParameters {
  userId: string;
}

export interface DeleteAllUserRefreshTokensParameters {
  userId: string;
}

export interface DeleteOldestRefreshTokenParameters {
  userId: string;
}

export interface DeleteRefreshTokenParameters {
  refreshToken: string;
}

export interface GetRefreshTokenParameters {
  refreshToken: string;
}

export interface IsRefreshTokenExpiredParameters {
  expiredAt: Date;
}
