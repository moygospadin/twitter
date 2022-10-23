import { Field, InputType } from '@nestjs/graphql';

import { MemberInput } from './member.input';

@InputType()
export class CreatePrivateChatInput {
  @Field(() => MemberInput, { nullable: false })
  member: MemberInput;
}
