import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class RequestSignUpInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(1)
  email: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(1)
  firstName: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(1)
  lastName: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MaxLength(20)
  @MinLength(1)
  password: string;

  @Field(() => String, { nullable: false })
  @IsString()
  repeatPassword: string;
}
