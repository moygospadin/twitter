import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReRequestSignUpInput {
  @Field(() => String, { nullable: false })
  email: string;
}
