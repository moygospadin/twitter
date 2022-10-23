import { Field, InputType } from '@nestjs/graphql';

import { MemberInput } from './member.input';

@InputType()
export class CreateGroupChatInput {
  @Field(() => [MemberInput], { nullable: false })
  members: MemberInput[];

  @Field(() => String, { nullable: false })
  title: string;
}
