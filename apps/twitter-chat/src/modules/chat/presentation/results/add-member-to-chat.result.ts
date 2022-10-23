import { Field, ObjectType } from '@nestjs/graphql';

import { AddMemberToChatError } from '../errors';

@ObjectType()
export class AddMemberToChatResult {
  @Field(() => AddMemberToChatError, { nullable: true })
  error?: AddMemberToChatError;
}
