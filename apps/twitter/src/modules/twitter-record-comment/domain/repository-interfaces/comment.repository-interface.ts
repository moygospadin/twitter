import { CommentDomnainModel, CommentImageDomainModel } from '../models';

export interface CommentRepositoryInterface {
  addComment(parameters: AddCommentParameters): Promise<CommentDomnainModel>;
  deleteCommentById(parameters: DeleteCommentByIdParameters): Promise<void>;
  getFlatChildTreeOfCommentsByTweetId(parameters: GetFlatChildTreeOfCommentsByTweetIdParameters): Promise<CommentDomnainModel[]>;
}

export interface AddCommentParameters {
  commentedRecordAuthorId: string;
  commentedRecordId: string;
  createdAt: Date;
  images: Omit<CommentImageDomainModel, 'id'>[];
  updatedAt: Date;
  userId: string;
}

export interface DeleteCommentByIdParameters {
  commentId: string;
  userId: string;
}

export interface GetFlatChildTreeOfCommentsByTweetIdParameters {
  tweetId: string;
}
