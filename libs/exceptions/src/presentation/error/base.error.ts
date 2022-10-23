import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseError {
  @Field(() => String, { nullable: true })
  badRequest?: string;

  @Field(() => String, { nullable: true })
  notFound?: string;

  @Field(() => String, { nullable: true })
  unauthorized?: string;
}
