import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/google.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigModule } from '../config/config.module';
import { MockStrategy } from './mock.strategy';
import * as passport from 'passport';
import { UserRepository } from './user.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [ConfigModule, SharedModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, GoogleStrategy, JwtStrategy],
})
export class AuthModule implements OnModuleInit {
  onModuleInit() {
    const useMockAuth = false;
    if (useMockAuth) {
      this.configureMockStrategy();
    }
  }

  private configureMockStrategy() {
    console.warn('Using mock auth!');
    passport.unuse('jwt');
    passport.use('jwt', new MockStrategy());
  }
}
