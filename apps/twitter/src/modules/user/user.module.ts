import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';

import { OutboundEeModule } from '../event-emitter/outbound';

import { SocialMediaProfileLinkName } from './core/enums';
import { USER_REPOSITORY_TOKEN } from './core/tokens';
import { UserDomain } from './domain';
import { UserRepository } from './infrastructure';
import { UserResolver } from './presentation';

registerEnumType(SocialMediaProfileLinkName, { name: 'SocialMediaProfileLinkName' });

@Module({
  controllers: [],
  exports: [UserDomain],
  imports: [OutboundEeModule],
  providers: [{ provide: USER_REPOSITORY_TOKEN, useClass: UserRepository }, UserDomain, UserResolver],
})
export class UserModule {}
