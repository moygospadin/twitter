import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

import { PrivacyInfo } from '../core';

export const PrivacyInfoArgs = createParamDecorator((_: unknown, context: ExecutionContext): PrivacyInfo => {
  const ctx = GqlExecutionContext.create(context);

  const request: Request = ctx.getContext().req;

  return {
    ip: request.socket.remoteAddress,
    userAgent: request.headers['user-agent'],
  };
});
