import { UserEntity } from './../user/entity/user.entity';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
export interface userWithTokens {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
}
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<userWithTokens> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
