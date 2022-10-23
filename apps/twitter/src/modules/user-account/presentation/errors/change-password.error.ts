import { Field, ObjectType } from '@nestjs/graphql';

import { BaseError } from '@libs/exceptions';

@ObjectType()
export class ChangePasswordError extends BaseError {
  @Field(() => String, { nullable: true })
  repeatedPasswordNotMatch: string;
}
