import { Response } from 'express';

export class CookieService {
  public clearCookie(res: Response) {
    res.clearCookie('sessionId', {
      domain: '',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    res.clearCookie('refreshToken', {
      domain: '',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  }

  public setCookie(sessionId: string, refreshToken: string, res: Response) {
    this.clearCookie(res);

    res.cookie('sessionId', sessionId, {
      domain: '',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    res.cookie('refreshToken', refreshToken, {
      domain: '',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  }
}
