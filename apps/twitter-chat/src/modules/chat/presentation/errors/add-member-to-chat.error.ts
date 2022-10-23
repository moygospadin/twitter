import { IntersectionType, ObjectType } from '@nestjs/graphql';

import { BaseError, ForbiddenError } from '@libs/exceptions';

@ObjectType()
export class AddMemberToChatError extends IntersectionType(BaseError, ForbiddenError) {}
