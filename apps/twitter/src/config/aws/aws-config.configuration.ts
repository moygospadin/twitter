import { AwsConfig } from './aws-config.type';

export const awsConfiguration = (): AwsConfig => {
  return {
    aws: {
      accessKeyId: process.env.TWITTER_AWS_ACCESS_KEY_ID,
      bucket: process.env.TWITTER_AWS_BUCKET,
      endpoint: process.env.TWITTER_AWS_ENDPOINT,
      expiresIn: parseInt(process.env.TWITTER_AWS_EXPIRES_IN, 10),
      region: process.env.TWITTER_AWS_REGION,
      secretAccessKey: process.env.TWITTER_AWS_SECRET_ACCESS_KEY,
    },
  };
};
