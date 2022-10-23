import { Field, ObjectType } from '@nestjs/graphql';

import { BaseError } from '@libs/exceptions';

@ObjectType()
export class UpdateAvatarError extends BaseError {
  @Field(() => String, { nullable: true })
  maxFileSizeExceeded?: string;

  @Field(() => String, { nullable: true })
  mimeTypeIsNotAllowed?: string;
}
