import { Field, ObjectType } from '@nestjs/graphql';

import { AvatarDto } from '../../../user/presentation/dtos';
import { UpdateAvatarError } from '../errors';

@ObjectType()
export class UpdateAvatarResult {
  @Field(() => AvatarDto, { nullable: true })
  data?: AvatarDto;

  @Field(() => UpdateAvatarError, { nullable: true })
  error?: UpdateAvatarError;
}
