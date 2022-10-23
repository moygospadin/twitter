import { Field, ObjectType } from '@nestjs/graphql';

import { UserDto } from '../../../user/presentation/dtos';
import { UpdateAccountError } from '../errors';

@ObjectType()
export class UpdateAccountResult {
  @Field(() => UserDto, { nullable: true })
  data?: UserDto;

  @Field(() => UpdateAccountError, { nullable: true })
  error?: UpdateAccountError;
}
