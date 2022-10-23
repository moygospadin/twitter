import { Field, ObjectType } from '@nestjs/graphql';

import { SignOutError } from '../errors';

@ObjectType()
export class SignOutResult {
  @Field(() => SignOutError, { nullable: true })
  error?: SignOutError;
}
