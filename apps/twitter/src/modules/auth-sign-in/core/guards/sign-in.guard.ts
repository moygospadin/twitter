import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { CurrentUser } from '@libs/auth';

import { UserAlreadyLoginedException } from '../exceptions';

@Injectable()
export class SignInGuard implements CanActivate {
  private readonly signInGuardErrorContext = 'Sign in guard';

  public canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const gqlContext = ctx.getContext();

    const { currentUser }: { currentUser: CurrentUser } = gqlContext.req;

    if (currentUser) {
      throw new UserAlreadyLoginedException(this.signInGuardErrorContext);
    }

    return true;
  }
}
