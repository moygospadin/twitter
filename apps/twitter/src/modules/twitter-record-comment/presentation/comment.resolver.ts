import { MimeType } from '@jebulday/aws';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { CurrentUser, CurrentUserArgs, GqlAuthGuard } from '@libs/auth';
import { FilesUploadValidationPipe } from '@libs/graphql';

import { CommentService } from '../application';

import { CommentDto } from './dtos';
import { CreateCommentInput, DeleteCommentByIdInput, GetCommentsByTweetIdInput } from './inputs';
import { DeleteCommentByIdResult, GetCommentsByTweetIdResult } from './results';

@Resolver(() => CommentDto)
@UseGuards(GqlAuthGuard)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentDto)
  public async createComment(
    @Args('input') input: CreateCommentInput,
    @Args(
      { name: 'images', type: () => [GraphQLUpload] },
      new FilesUploadValidationPipe({ allowedMimeTypes: [MimeType.png, MimeType.jpeg, MimeType.jpg] }),
    )
    commentImages: FileUpload[],
    @CurrentUserArgs() currentUser: CurrentUser,
  ) {
    const { commentedRecordAuthorId, commentedRecordId } = input;

    const data = await this.commentService.createComment({
      commentedRecordAuthorId,
      commentedRecordId,
      currentUser,
      images: commentImages,
    });

    return { data };
  }

  @Mutation(() => DeleteCommentByIdResult)
  public async deleteCommentById(
    @Args('input') input: DeleteCommentByIdInput,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<DeleteCommentByIdResult> {
    const { commentId } = input;

    await this.commentService.deleteCommentById({ commentId, currentUser });

    return { error: null };
  }

  @Query(() => GetCommentsByTweetIdResult)
  public async getCommentsByTweetId(
    @Args('input') input: GetCommentsByTweetIdInput,
    @CurrentUserArgs() currentUser: CurrentUser,
  ): Promise<GetCommentsByTweetIdResult> {
    const { tweetId } = input;

    const data = await this.commentService.getCommentsByTweetId({ currentUser, tweetId });

    return { data };
  }
}
