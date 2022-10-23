import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AvatarDto {
  @Field(() => String, { nullable: false })
  readonly id: string;

  @Field(() => String, { nullable: false })
  key: string;

  @Field(() => String, { nullable: false })
  url: string;
}
