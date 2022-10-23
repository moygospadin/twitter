import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileDataDto {
  @Field(() => String, { nullable: false })
  key: string;

  @Field(() => String, { nullable: false })
  url: string;
}
