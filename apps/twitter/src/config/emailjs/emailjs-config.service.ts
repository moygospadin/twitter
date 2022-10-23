import { EmailjsModuleOptions, EmailjsModuleOptionsFactory } from '@jebulday/emailjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../configuration.type';

@Injectable()
export class EmailjsConfigService implements EmailjsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createEmailjsOptions(): EmailjsModuleOptions {
    const { privateKey, publicKey } = this.configService.get('emailjs');

    return { privateKey, publicKey };
  }
}
