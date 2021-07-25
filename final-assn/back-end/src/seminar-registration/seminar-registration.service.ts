import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeminarRegistration } from './seminar-registration.entity';
import { Repository } from 'typeorm';
import {
  SeminarRegistrationCreateDto,
  SeminarRegistrationUpdateDto,
} from './seminar-registration.dto';
import { AccountService } from '../account/account.service';
import { SeminarService } from '../seminar/seminar.service';
import { SeminarStatusType } from './seminar-registration.meta';

@Injectable()
export class SeminarRegistrationService {
  constructor(
    @InjectRepository(SeminarRegistration)
    private readonly seminarRegisterRepo: Repository<SeminarRegistration>,
    private readonly accountService: AccountService,
    private readonly seminarService: SeminarService,
  ) {}

  async save(dto: SeminarRegistrationCreateDto) {
    const saveDto = {
      status: SeminarStatusType.pending,
      created_at: new Date(),
      updated_at: new Date(),
      user_uuid: dto.user_uuid,
      seminar_uuid: dto.seminar_uuid,
    };
    return await this.seminarRegisterRepo.save(saveDto);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  find(findOptions?: object) {
    return this.seminarRegisterRepo.find(findOptions);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(findOptions: object) {
    return await this.seminarRegisterRepo.findOne(findOptions);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async update(findOptions: object, dto: SeminarRegistrationUpdateDto) {
    const existRegistration = await this.seminarRegisterRepo.findOne(
      findOptions,
    );
    return await this.seminarRegisterRepo.update(findOptions, {
      status: dto.status,
      updated_at: new Date(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  delete(findOptions: object) {
    return this.seminarRegisterRepo.delete(findOptions);
  }
}
