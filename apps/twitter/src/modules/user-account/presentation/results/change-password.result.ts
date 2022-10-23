import { Field, ObjectType } from '@nestjs/graphql';

import { ChangePasswordError } from '../errors';

@ObjectType()
export class ChangePasswordResult {
  @Field(() => ChangePasswordError, { nullable: true })
  error?: ChangePasswordError;
}
