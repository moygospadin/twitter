import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ForbiddenError {
  @Field(() => String, { nullable: true })
  forbidden?: string;
}
