import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String, { nullable: false })
  commentedRecordAuthorId: string;

  @Field(() => String, { nullable: false })
  commentedRecordId: string;
}
