import { Field, ObjectType } from '@nestjs/graphql';

import { RequestSignUpError } from '../errors';

@ObjectType()
export class RequestSignUpResult {
  @Field(() => RequestSignUpError, { nullable: true })
  error?: RequestSignUpError;
}
