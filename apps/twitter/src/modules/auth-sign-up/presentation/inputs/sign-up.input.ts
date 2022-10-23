import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  otp: string;
}
