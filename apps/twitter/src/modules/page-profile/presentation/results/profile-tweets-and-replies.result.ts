import { Field, ObjectType } from '@nestjs/graphql';

import { ProfileTweetsAndRepliesError } from '../errors';

@ObjectType()
export class ProfileTweetsAndRepliesResult {
  @Field(() => ProfileTweetsAndRepliesError, { nullable: true })
  error?: ProfileTweetsAndRepliesError;
}
