import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MemberInput {
  @Field(() => String, { nullable: false })
  userId: string;
}
