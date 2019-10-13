import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';
import { ConfigService } from '../../config/config.service';

/**
 * Authentication strategy using OAuth from Google.
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService, configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${configService.get('GOOGLE_OAUTH_CALLBACK_BASE_URL')}/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  /**
   * Validate request.
   */
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: Function,
  ) {
    try {
      // console.log(profile);
      const jwt: string = await this.authService.validateOAuthLogin(
        profile.id,
        Provider.GOOGLE,
      );
      const user = {
        jwt,
      };
      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
