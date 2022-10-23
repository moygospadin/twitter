import { Field, ObjectType } from '@nestjs/graphql';

import { DeleteCommentByIdError } from '../errors';

@ObjectType()
export class DeleteCommentByIdResult {
  @Field(() => DeleteCommentByIdError, { nullable: true })
  error?: DeleteCommentByIdError;
}
