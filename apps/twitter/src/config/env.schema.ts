import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  TWITTER_APP_URL: string;

  @IsString()
  TWITTER_AWS_ACCESS_KEY_ID: string;

  @IsString()
  TWITTER_AWS_BUCKET: string;

  @IsString()
  TWITTER_AWS_ENDPOINT: string;

  @IsNumber()
  TWITTER_AWS_EXPIRES_IN: number;

  @IsString()
  TWITTER_AWS_REGION: string;

  @IsString()
  TWITTER_AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  TWITTER_EMAILJS_PRIVATE_API_KEY: string;

  @IsString()
  TWITTER_EMAILJS_PUBLIC_API_KEY: string;

  @IsBoolean()
  TWITTER_GRAPHQL_PLAYGROUND: boolean;

  @IsNumber()
  TWITTER_PORT: number;

  @IsString()
  TWITTER_POSTGRES_URL: string;

  @IsString()
  TWITTER_RABBITMQ_URL: string;

  @IsString()
  TWITTER_REDIS_URL: string;
}
