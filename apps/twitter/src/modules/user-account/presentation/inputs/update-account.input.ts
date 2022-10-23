import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;
}
