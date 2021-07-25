import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from '../account/account.service';
import { Request, Response } from 'express';
import { AccountDto } from '../account/account.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request, @Res() res: Response) {
    const user: any = req.user;
    const token = await this.authService.login(user);
    console.log(token.access_token);
    res.cookie('Authentication', token.access_token, {
      httpOnly: true,
      path: '/',
    });
    this.accountService.updateLoginById(user.id);
    return res.send(user);
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Res() res: Response) {
    res.cookie('Authentication', '', { httpOnly: true, path: '/', maxAge: 0 });
    return res.sendStatus(200);
  }

  @Post('register')
  async register(@Body() dto: AccountDto) {
    const newAccount = await this.accountService.save(dto);
    console.log(newAccount.id);
    console.log(newAccount.uuid);
    return newAccount;
  }

  @Get('information')
  @UseGuards(AuthGuard('jwt'))
  async information(@Req() req: Request) {
    const user: any = req.user;
    console.log(user);
    if (user.account_type == 'STUDENT') {
      const { password, crypto_salt, ...userInformation } =
        await this.accountService.findOne({
          id: user.id,
          relations: ['seminar_registrations'],
        });
      return userInformation;
    } else {
      const { password, crypto_salt, ...userInformation } =
        await this.accountService.findOne({
          id: user.id,
        });
      return userInformation;
    }
  }
}
