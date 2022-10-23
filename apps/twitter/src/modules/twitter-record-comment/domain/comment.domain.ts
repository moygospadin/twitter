import { AwsService, FileUpload } from '@jebulday/aws';
import { Inject, Injectable } from '@nestjs/common';

import { TWITTER_RECORD_REPOSITORY_TOKEN } from '../../twitter-record/core/tokens';

import { CreateCommentParameters, DeleteCommentByIdParameters, GetCommentsByTweetIdParameters } from './comment-domain.type';
import { CommentRepositoryInterface } from './repository-interfaces';

@Injectable()
export class CommentDomain {
  constructor(
    private readonly awsService: AwsService,
    @Inject(TWITTER_RECORD_REPOSITORY_TOKEN) private readonly commentRepository: CommentRepositoryInterface,
  ) {}

  private uploadCommentImages(files: FileUpload[], userId: string) {
    if (!files.length) {
      return [];
    }

    return Promise.all(
      files.map(async (file) => this.awsService.putFile({ file, subPath: `users/${userId}/twitter-record/comments/` })),
    );
  }

  public async createComment({ commentedRecordAuthorId, commentedRecordId, images, userId }: CreateCommentParameters) {
    const createdAt = new Date();

    const uploadedImages = await this.uploadCommentImages(images, userId);

    return this.commentRepository.addComment({
      commentedRecordAuthorId,
      commentedRecordId,
      createdAt,
      images: uploadedImages,
      updatedAt: createdAt,
      userId,
    });
  }

  public async deleteCommentById({ commentId, userId }: DeleteCommentByIdParameters) {
    await this.commentRepository.deleteCommentById({ commentId, userId });
  }

  public async getCommentsByTweetId({ tweetId }: GetCommentsByTweetIdParameters) {
    return this.commentRepository.getFlatChildTreeOfCommentsByTweetId({ tweetId });
  }
}
