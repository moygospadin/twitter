import { Field, ObjectType } from '@nestjs/graphql';

import { UserDto } from '../dtos';
import { MeError } from '../errors';

@ObjectType()
export class MeResult {
  @Field(() => UserDto, { nullable: true })
  data?: UserDto;

  @Field(() => MeError, { nullable: true })
  error?: MeError;
}
