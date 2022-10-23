import { Field, ObjectType } from '@nestjs/graphql';

import { CreateGroupChatError } from '../errors';

@ObjectType()
export class CreateGroupChatResult {
  @Field(() => CreateGroupChatError, { nullable: true })
  error?: CreateGroupChatError;
}
