import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({ usernameField: 'id' });
  }

  async validate(id: string, password: string): Promise<any> {
    const user = await this.authService.validateAccount(id, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(account: any) {
    const payload = {
      id: account.id,
      name: account.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
