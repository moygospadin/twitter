import { Field, ObjectType } from '@nestjs/graphql';

import { FileDataDto } from '@libs/graphql';

@ObjectType()
export class CommentDto {
  @Field(() => String, { nullable: true })
  commentedRecordAuthorId: string;

  @Field(() => String, { nullable: true })
  commentedRecordId: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => [FileDataDto], { nullable: false })
  images: FileDataDto[];

  @Field(() => String, { nullable: true })
  text: string;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  userId: string;
}
