import { Field, ObjectType } from '@nestjs/graphql';

import { TweetImageDto } from './tweet-image.dto';

@ObjectType()
export class TweetDto {
  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => String, { nullable: false })
  readonly id!: string;

  @Field(() => [TweetImageDto], { nullable: false })
  images: TweetImageDto[];

  @Field(() => String, { nullable: true })
  text: string;

  @Field(() => Date, { nullable: false })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  userId: string;
}
