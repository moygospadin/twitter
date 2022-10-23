import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteCommentByIdInput {
  @Field(() => String, { nullable: false })
  commentId: string;
}
