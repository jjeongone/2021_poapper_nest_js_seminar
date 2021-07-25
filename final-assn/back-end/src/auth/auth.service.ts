import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateAccount(id: string, pass: string): Promise<any> {
    const account = await this.accountService.findOne({ id: id });
    const encryptedPassword = crypto
      .pbkdf2Sync(pass, account.crypto_salt, 999, 64, 'sha512')
      .toString('base64');

    if (account.password === encryptedPassword) {
      const { password, ...result } = account;
      return result;
    }
    return null;
  }

  async login(account: any) {
    const payload = {
      id: account.id,
      name: account.name,
      account_type: account.account_type,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
