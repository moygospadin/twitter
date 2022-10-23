import { Request, Response } from 'express';

import { CurrentUser } from '@libs/auth';

interface TypedRequest extends Request {
  cookies: {
    refreshToken: string;
    sessionId: string;
  };
}

declare global {
  interface GraphqlContext {
    req: TypedRequest;
    res: Response;
  }

  declare namespace Express {
    interface Request {
      currentUser?: CurrentUser;
    }
  }
}

declare module '@nestjs/config' {
  class ConfigService<Config extends Record<unknown, Record<string, unknown>>> {
    public get<ConfigKey extends keyof Config>(parameter: ConfigKey): Config[ConfigKey];
  }
}
