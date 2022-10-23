import { Resolver } from '@nestjs/graphql';

import { RetweetService } from '../application';

@Resolver()
export class RetweetResolver {
  constructor(private readonly retweetService: RetweetService) {}
}
