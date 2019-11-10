import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../../config/config.service';

export enum Provider {
  GOOGLE = 'google',
  TEST = "test",
}

/**
 * Service providing authentication functionality.
 */
@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      // Use Google User Id as subject.
      const payload = {
        sub: thirdPartyId,
        provider,
      };
      const jwtSecretKey = this.configService.get('JWT_SECRET_KEY');
      const jwt: string = sign(
        payload,
        jwtSecretKey,
        {
          expiresIn: 3600 * 24 * 7,
        },
      );
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
