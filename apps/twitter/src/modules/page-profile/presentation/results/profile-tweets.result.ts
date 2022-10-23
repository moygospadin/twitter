import { Field, ObjectType } from '@nestjs/graphql';

import { ProfileTweetsError } from '../errors';

@ObjectType()
export class ProfileTweetsResult {
  @Field(() => ProfileTweetsError, { nullable: true })
  error?: ProfileTweetsError;
}
