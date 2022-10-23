import { Field, ObjectType } from '@nestjs/graphql';

import { ProfileLikesError } from '../errors';

@ObjectType()
export class ProfileLikesResult {
  @Field(() => ProfileLikesError, { nullable: true })
  error?: ProfileLikesError;
}
