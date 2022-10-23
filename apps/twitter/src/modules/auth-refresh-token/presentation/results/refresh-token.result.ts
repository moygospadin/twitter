import { Field, ObjectType } from '@nestjs/graphql';

import { RefreshTokenDto } from '../dtos';
import { RefreshTokenError } from '../errors';

@ObjectType()
export class RefreshTokenResult {
  @Field(() => RefreshTokenDto, { nullable: true })
  data?: RefreshTokenDto;

  @Field(() => RefreshTokenError, { nullable: true })
  error?: RefreshTokenError;
}
