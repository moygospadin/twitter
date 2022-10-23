import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { SESSION_STORAGE_TOKEN } from '../core';
import { SessionStorageInterface } from '../infrastructure';

@Injectable()
export class GqlAuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(SESSION_STORAGE_TOKEN)
    private readonly sessionStorage: SessionStorageInterface,
  ) {}

  public async use(request: Request, _: Response, next: NextFunction) {
    const sessionId = request.cookies.sessionId;

    try {
      const currentUser = await this.sessionStorage.getSession({ sessionId });

      const { userId } = currentUser;

      if (!currentUser) {
        request.currentUser = null;

        return;
      }

      request.currentUser = {
        sessionId,
        userId,
      };
    } catch {
      request.currentUser = null;
    } finally {
      return next();
    }
  }
}
