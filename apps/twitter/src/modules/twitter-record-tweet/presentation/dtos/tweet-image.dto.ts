import { Field, ObjectType } from '@nestjs/graphql';

import { FileDataDto } from '@libs/graphql';

@ObjectType()
export class TweetImageDto extends FileDataDto {
  @Field(() => String, { nullable: false })
  readonly id!: string;
}
