import { Field, ObjectType } from '@nestjs/graphql';

import { SignOutFromAllDevicesError } from '../errors';

@ObjectType()
export class SignOutFromAllDevicesResult {
  @Field(() => SignOutFromAllDevicesError, { nullable: true })
  error?: SignOutFromAllDevicesError;
}
