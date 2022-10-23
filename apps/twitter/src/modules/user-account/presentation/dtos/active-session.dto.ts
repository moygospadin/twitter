import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ActiveSessionDto {
  @Field(() => String, { nullable: false })
  ip: string;

  @Field(() => Date, { nullable: false })
  loggedAt: Date;

  @Field(() => String, { nullable: false })
  userAgent: string;
}
