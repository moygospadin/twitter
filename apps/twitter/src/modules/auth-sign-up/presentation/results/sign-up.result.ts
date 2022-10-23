import { Field, ObjectType } from '@nestjs/graphql';

import { SignUpDto } from '../dtos';
import { SignUpError } from '../errors';

@ObjectType()
export class SignUpResult {
  @Field(() => SignUpDto, { nullable: true })
  data?: SignUpDto;

  @Field(() => SignUpError, { nullable: true })
  error?: SignUpError;
}
