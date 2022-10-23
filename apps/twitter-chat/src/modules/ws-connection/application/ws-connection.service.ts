import { Injectable } from '@nestjs/common';

import { CurrentUser } from '@libs/auth';

import { SessionCacheRepository, WsConnectionCacheRepository } from '../infrastructure';

@Injectable()
export class WsConnectionService {
  constructor(
    private readonly sessionCacheRepository: SessionCacheRepository,
    private readonly wsConnectionCacheRepository: WsConnectionCacheRepository,
  ) {}

  private getCookie(cookieHeader, coookieName) {
    const name = coookieName + '=';

    if (!cookieHeader) {
      return '';
    }

    const cookies = cookieHeader.split(';');

    for (let cookie of cookies) {
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }

      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
  }

  onConnect = async (_, ctx): Promise<{ currentUser: CurrentUser }> => {
    const cookieHeader = ctx.upgradeReq.headers.cookie;

    const sessionId = this.getCookie(cookieHeader, 'sessionId');
    const session = await this.sessionCacheRepository.getSession({ sessionId });

    await this.wsConnectionCacheRepository.set({ socketId: session.sessionId, userId: session.userId });

    return { currentUser: session };
  };

  onDisconnect = async (ctx, _) => {
    const cookieHeader = ctx.upgradeReq.headers.cookie;
    const sessionId = this.getCookie(cookieHeader, 'sessionId');

    console.log({ sessionId });

    await this.wsConnectionCacheRepository.delete({ socketId: sessionId });

    return;
  };
}
