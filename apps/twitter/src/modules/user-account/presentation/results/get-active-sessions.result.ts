import { Field, ObjectType } from '@nestjs/graphql';

import { ActiveSessionDto } from '../dtos';
import { GetActiveSessionsError } from '../errors';

@ObjectType()
export class GetActiveSessionsResult {
  @Field(() => [ActiveSessionDto], { nullable: true })
  data?: ActiveSessionDto[];

  @Field(() => GetActiveSessionsError, { nullable: true })
  error?: GetActiveSessionsError;
}
