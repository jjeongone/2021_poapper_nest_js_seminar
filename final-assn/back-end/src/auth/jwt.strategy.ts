import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.headers?.cookie.split('=')[1];
        },
      ]),
      ignoreExpiration: false,
      // secretOrKey: process.env.JWT_SECRETE_KEY,
      secretOrKey: 'jwt secret key',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      account_type: payload.account_type,
    };
  }
}
