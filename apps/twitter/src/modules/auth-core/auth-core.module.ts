import { Module } from '@nestjs/common';

import { CookieService } from './application';

@Module({ controllers: [], exports: [CookieService], imports: [], providers: [CookieService] })
export class AuthCoreModule {}
