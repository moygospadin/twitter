import { CurrentUser } from '@libs/auth';

export interface CreateRetweetParameters {
  currentUser: CurrentUser;
  retweetedRecordAuthorId: string;
  retweetedRecordId: string;
}

export interface DeleteRetwwetByIdParameters {
  currentUser: CurrentUser;
  retweetId: string;
}
