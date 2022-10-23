import { Field, InputType } from '@nestjs/graphql';

import { MemberInput } from './member.input';

@InputType()
export class AddMemberToChatInput {
  @Field(() => String, { nullable: false })
  chatId: string;

  @Field(() => MemberInput, { nullable: false })
  member: MemberInput;
}
