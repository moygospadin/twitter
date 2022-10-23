import { Field, ObjectType } from '@nestjs/graphql';

import { SignInError } from '../errors';

@ObjectType()
export class SignInResult {
  @Field(() => SignInError, { nullable: true })
  error?: SignInError;
}
