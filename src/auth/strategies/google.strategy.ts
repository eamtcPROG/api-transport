import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(protected readonly configService: ConfigService) {
    const clId = configService.get('google.console_clientid');
      const clSecret = configService.get('google.console_clientsecret');
      
      console.log(
        'GoogleStrategyGoogleStrategyGoogleStrategyGoogleStrategy clId = ',
        clId,
      );

    super({
      clientID: clId,
      clientSecret: clSecret,
        
      callbackURL: '',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Add your validation and user creation logic here
    // profile will contain user information from Google
    // e.g., profile.id, profile.displayName, profile.emails
    return { userId: profile.id, email: profile.emails[0].value };
  }
}
