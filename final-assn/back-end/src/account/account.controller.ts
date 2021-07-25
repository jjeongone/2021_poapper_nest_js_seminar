import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountDto } from './account.dto';
import { AccountRoles } from '../auth/roles.decorator';
import { AccountType } from './account.meta';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  post(@Body() dto: AccountDto) {
    return this.accountService.save(dto);
  }

  @Get('student')
  @AccountRoles(AccountType.instructor, AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getStudent() {
    return this.accountService.find({
      where: { account_type: 'STUDENT' },
      order: { created_at: 'DESC' },
      relations: ['seminar_registrations'],
    });
  }

  @Get()
  @AccountRoles(AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getAll() {
    return this.accountService.find({
      order: { created_at: 'DESC' },
      relations: ['seminar_registrations'],
    });
  }

  @Get(':uuid')
  @AccountRoles(AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getOne(@Param('uuid') uuid: string) {
    return this.accountService.findOne({
      uuid: uuid,
    });
  }

  @Put(':uuid')
  @AccountRoles(AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('uuid') uuid: string, @Body() dto: AccountDto) {
    return this.accountService.update({ uuid: uuid }, dto);
  }

  @Delete(':uuid')
  @AccountRoles(AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  delete(@Param('uuid') uuid: string) {
    return this.accountService.delete({ uuid: uuid });
  }
}
