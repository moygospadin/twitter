import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UnauthorizedException } from '@libs/exceptions';

import { CurrentUser } from '../core';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const gqlContext = ctx.getContext();

    if (!gqlContext) {
      return true;
    }

    const { currentUser }: { currentUser: CurrentUser } = gqlContext.req;

    if (!currentUser) {
      throw new UnauthorizedException('Guard unauthorized');
    }

    return true;
  }
}
