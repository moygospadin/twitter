export interface CreateRetweetParameters {
  retweetedRecordAuthorId: string;
  retweetedRecordId: string;
  userId: string;
}

export interface DeleteRetwwetByIdParameters {
  retweetId: string;
  userId: string;
}

export interface GetRetweetsByUserIdParameters {
  userId: string;
}
