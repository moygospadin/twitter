import { ObjectType } from '@nestjs/graphql';

import { BaseError } from '@libs/exceptions';

@ObjectType()
export class SignOutFromAllDevicesError extends BaseError {}
