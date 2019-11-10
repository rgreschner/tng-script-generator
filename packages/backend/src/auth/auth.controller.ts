import {
  Controller,
  Get,
  UseGuards,
  Res,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '../config/config.service';
import { AuthService, Provider } from './auth/auth.service';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';
import { UserRepository } from './user.repository';


/**
 * Authentication controller.
 */
@Controller('auth')
export class AuthController {
  appRedirectBaseUrl = 'http://localhost';

  constructor(
    configService: ConfigService,
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {
    this.appRedirectBaseUrl = configService.get('APP_REDIRECT_BASE_URL');
  }

  /**
   * Authenticate with Google.
   */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  /**
   * Callback for authentication with Google.
   */
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${this.appRedirectBaseUrl}/auth-with-jwt/${jwt}`);
    } else {
      res.redirect(`${this.appRedirectBaseUrl}/auth-with-jwt/failed`);
    }
  }

  /**
   * Perform authentication check.
   * Errors on invalid JWT using guard.
   */
  @Get('check')
  @UseGuards(AuthGuard('jwt'))
  authCheck() {
    return {
      isAuthenticated: true,
    };
  }

  /**
   * Perform user login.
   */
  @Post('login')
  async login(@Body() payload: any) {
    const username = payload.username;
    const user = await this.userRepository.findOneById(username);
    if (!user) {
      throw new Error('Invalid credentials.');
    }
    const arePasswordsMatching = await bcrypt.compare(payload.password, user.password);
    if (!arePasswordsMatching) {
      throw new Error('Invalid credentials.');
    }
    const jwt = await this.authService.validateOAuthLogin(
      username,
      Provider.TEST,
    );
    return { jwt };
  }

  /**
   * Perform user registration.
   */
  @Post('register')
  async register(@Body() payload: any) {
    const password = payload.password;
    const _id = payload.username;
    if (_id === '') {
      throw new Error("Invalid username.");
    }
    if (password === '') {
      throw new Error("Invalid password.");
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    let user = null;
    user = await this.userRepository.findOneById(_id);
    if (!!user) {
      throw new Error(`User '${_id}' does already exist.`);
    }
    user = { _id, password: cryptedPassword };
    await this.userRepository.save(user);
    console.log(`Registered user '${_id}'.`);
    return {success: true};
  }
}
