import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SeminarProgressService } from './seminar-progress.service';
import { SeminarProgressDto } from './seminar-progress.dto';
import { AccountRoles } from '../auth/roles.decorator';
import { AccountType } from '../account/account.meta';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller('seminar-progress')
export class SeminarProgressController {
  constructor(
    private readonly seminarProgressService: SeminarProgressService,
  ) {}

  @Post()
  @AccountRoles(AccountType.instructor, AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  post(@Body() dto: SeminarProgressDto) {
    return this.seminarProgressService.save(dto);
  }

  @Get()
  get(@Query('seminar_uuid') seminar_uuid: string) {
    if (seminar_uuid) {
      return this.seminarProgressService.find({
        where: { seminar_uuid: seminar_uuid },
        order: { created_at: 'DESC' },
        relations: ['user_uuid', 'seminar_uuid'],
      });
    } else {
      return this.seminarProgressService.find({
        order: { created_at: 'DESC' },
        relations: ['user_uuid', 'seminar_uuid'],
      });
    }
  }

  @Get()
  getAll() {
    return this.seminarProgressService.find({
      order: { created_at: 'DESC' },
      relations: ['user_uuid', 'seminar_uuid'],
    });
  }

  @Get(':uuid')
  getOne(@Param('uuid') uuid: string) {
    return this.seminarProgressService.findOne({ uuid: uuid });
  }

  @Put(':uuid')
  @AccountRoles(AccountType.instructor, AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('uuid') uuid: string, @Body() dto: SeminarProgressDto) {
    return this.seminarProgressService.update({ uuid: uuid }, dto);
  }

  @Delete(':uuid')
  @AccountRoles(AccountType.instructor, AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  delete(@Param('uuid') uuid: string) {
    return this.seminarProgressService.delete({ uuid: uuid });
  }
}
