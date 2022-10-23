import { Field, ObjectType } from '@nestjs/graphql';

import { CommentDto } from '../dtos';
import { GetCommentsByTweetIdError } from '../errors';

// @ObjectType()
// class GetCommentsByTweetIdResultData {
//   comments: CommentDto;
// }

@ObjectType()
export class GetCommentsByTweetIdResult {
  @Field(() => [CommentDto], { nullable: true })
  data?: CommentDto[];

  @Field(() => GetCommentsByTweetIdError, { nullable: true })
  error?: GetCommentsByTweetIdError;
}
