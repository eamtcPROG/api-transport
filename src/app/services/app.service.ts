import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService  {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello World! -> ' + this.configService.get('NODE_ENV') + ' ENV!';
  }
}