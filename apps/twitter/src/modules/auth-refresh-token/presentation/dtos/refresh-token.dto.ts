import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenDto {
  @Field(() => String, { nullable: false })
  refreshToken: string;
}
