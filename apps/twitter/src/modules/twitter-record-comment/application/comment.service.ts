import { Injectable } from '@nestjs/common';

import { CommentDomain } from '../domain';

import { CreateCommentParameters, DeleteCommentByIdParameters, GetCommentsByTweetIdParameters } from './comment.service-type';

@Injectable()
export class CommentService {
  constructor(private readonly commentDomain: CommentDomain) {}

  public async createComment({ commentedRecordAuthorId, commentedRecordId, currentUser, images }: CreateCommentParameters) {
    const { userId } = currentUser;

    return this.commentDomain.createComment({
      commentedRecordAuthorId,
      commentedRecordId,
      images,
      userId,
    });
  }

  public async deleteCommentById({ commentId, currentUser }: DeleteCommentByIdParameters) {
    const { userId } = currentUser;

    await this.commentDomain.deleteCommentById({ commentId, userId });
  }

  public async getCommentsByTweetId({ currentUser, tweetId }: GetCommentsByTweetIdParameters) {
    return this.commentDomain.getCommentsByTweetId({ tweetId });
  }
}
