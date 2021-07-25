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
import { SeminarService } from './seminar.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SeminarDto } from './seminar.dto';
import { AccountRoles } from '../auth/roles.decorator';
import { AccountType } from '../account/account.meta';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Seminar')
@Controller('seminar')
export class SeminarController {
  constructor(private readonly seminarService: SeminarService) {}

  @Post()
  @AccountRoles(AccountType.instructor, AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBody({ type: SeminarDto })
  post(@Body() dto: SeminarDto) {
    return this.seminarService.save(dto);
  }

  @Get()
  get(@Query('instructor_uuid') instructor_uuid: string) {
    if (instructor_uuid) {
      return this.seminarService.find({
        where: { instructor_uuid: instructor_uuid },
        order: { created_at: 'DESC' },
        relations: ['instructor'],
      });
    } else {
      return this.seminarService.find({
        order: { created_at: 'DESC' },
        relations: ['instructor'],
      });
    }
  }

  @Get()
  getAll() {
    return this.seminarService.find({
      order: { created_at: 'DESC' },
      relations: ['instructor'],
    });
  }

  @Get(':uuid')
  getOne(@Param('uuid') uuid: string) {
    return this.seminarService.findOne({ uuid: uuid });
  }

  @Put(':uuid')
  @AccountRoles(AccountType.instructor, AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('uuid') uuid: string, @Body() dto: SeminarDto) {
    return this.seminarService.update({ uuid: uuid }, dto);
  }

  @Delete(':uuid')
  @AccountRoles(AccountType.instructor, AccountType.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  delete(@Param('uuid') uuid: string) {
    return this.seminarService.delete({ uuid: uuid });
  }
}
