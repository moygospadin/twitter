import { Field, ObjectType } from '@nestjs/graphql';

import { AvatarDto } from './avatar.dto';

@ObjectType()
export class UserDto {
  @Field(() => AvatarDto, { nullable: true })
  avatar?: AvatarDto;

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  readonly id: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => Date, { nullable: false })
  updatedAt: Date;
}
