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
import { SeminarRegistrationService } from './seminar-registration.service';
import {
  SeminarRegistrationCreateDto,
  SeminarRegistrationUpdateDto,
} from './seminar-registration.dto';
import { AccountRoles } from '../auth/roles.decorator';
import { AccountType } from '../account/account.meta';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('seminar-registration')
export class SeminarRegistrationController {
  constructor(
    private readonly seminarRegistrationService: SeminarRegistrationService,
  ) {}

  @Post()
  post(@Body() dto: SeminarRegistrationCreateDto) {
    return this.seminarRegistrationService.save(dto);
  }

  @Get()
  get(
    @Query('user_uuid') user_uuid: string,
    @Query('seminar_uuid') seminar_uuid: string,
  ) {
    if (user_uuid) {
      return this.seminarRegistrationService.find({
        where: { user_uuid: user_uuid },
        order: { created_at: 'DESC' },
        relations: ['user_uuid', 'seminar_uuid'],
      });
    } else if (seminar_uuid) {
      return this.seminarRegistrationService.find({
        where: { seminar_uuid: seminar_uuid },
        order: { created_at: 'DESC' },
        relations: ['user_uuid', 'seminar_uuid'],
      });
    } else {
      return this.seminarRegistrationService.find({
        order: { created_at: 'DESC' },
        relations: ['user_uuid', 'seminar_uuid'],
      });
    }
  }

  @Get()
  getAll() {
    return this.seminarRegistrationService.find({
      order: { created_at: 'DESC' },
      relations: ['user_uuid', 'seminar_uuid'],
    });
  }

  @Get(':uuid')
  getOne(@Param('uuid') uuid: string) {
    return this.seminarRegistrationService.findOne({ uuid: uuid });
  }

  @Put(':uuid')
  @AccountRoles(AccountType.instructor, AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(
    @Param('uuid') uuid: string,
    @Body() dto: SeminarRegistrationUpdateDto,
  ) {
    return this.seminarRegistrationService.update({ uuid: uuid }, dto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    return this.seminarRegistrationService.delete({ uuid: uuid });
  }
}
