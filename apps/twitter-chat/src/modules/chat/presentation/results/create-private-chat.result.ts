import { Field, ObjectType } from '@nestjs/graphql';

import { CreatePrivateChatError } from '../errors';

@ObjectType()
export class CreatePrivateChatResult {
  @Field(() => CreatePrivateChatError, { nullable: true })
  error?: CreatePrivateChatError;
}
