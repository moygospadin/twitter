import { Field, ObjectType } from '@nestjs/graphql';

import { ReRequestSignUpError } from '../errors';

@ObjectType()
export class ReRequestSignUpResult {
  @Field(() => ReRequestSignUpError, { nullable: true })
  error?: ReRequestSignUpError;
}
