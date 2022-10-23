import { Field, ObjectType } from '@nestjs/graphql';

import { ProfileMediaError } from '../errors';

@ObjectType()
export class ProfileMediaResult {
  @Field(() => ProfileMediaError, { nullable: true })
  error?: ProfileMediaError;
}
