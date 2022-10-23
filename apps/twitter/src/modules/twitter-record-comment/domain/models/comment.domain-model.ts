import { CommentImageDomainModel } from './comment-image.domain-model';

export interface CommentDomnainModel {
  commentedRecordAuthorId: string;
  commentedRecordId: string;
  createdAt: Date;
  id: string;
  images: CommentImageDomainModel[];
  text: string;
  updatedAt: Date;
  userId: string;
}
