import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetUserTweetsInput {
  @Field(() => String, { nullable: false })
  userId: string;
}
