import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: false })
  repeatPassword: string;
}
