import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUpDto {
  @Field(() => String, { nullable: false })
  refreshToken: string;
}
