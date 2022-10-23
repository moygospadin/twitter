import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsBoolean()
  TWITTER_PAGE_MESSAGES_GRAPHQL_PLAYGROUND: boolean;

  @IsNumber()
  TWITTER_PAGE_MESSAGES_PORT: number;

  @IsString()
  TWITTER_PAGE_MESSAGES_POSTGRES_URL: string;

  @IsString()
  TWITTER_PAGE_MESSAGES_RABBITMQ_URL: string;

  @IsString()
  TWITTER_PAGE_MESSAGES_REDIS_URL: string;
}
