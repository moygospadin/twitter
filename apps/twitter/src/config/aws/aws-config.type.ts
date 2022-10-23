export interface AwsConfig {
  aws: {
    accessKeyId: string;
    bucket: string;
    endpoint: string;
    expiresIn: number;
    region: string;
    secretAccessKey: string;
  };
}
