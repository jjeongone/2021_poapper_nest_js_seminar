import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeminarProgress } from './seminar-progress.entity';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { SeminarService } from '../seminar/seminar.service';
import { SeminarProgressDto } from './seminar-progress.dto';

@Injectable()
export class SeminarProgressService {
  constructor(
    @InjectRepository(SeminarProgress)
    private readonly seminarProgressRepo: Repository<SeminarProgress>,
    private readonly accountService: AccountService,
    private readonly seminarService: SeminarService,
  ) {}

  async save(dto: SeminarProgressDto) {
    const existUser = await this.accountService.findOne({ id: dto.user_id });
    const saveDto = {
      seminar_date: dto.seminar_date,
      seminar_number_of_time: dto.seminar_number_of_time,
      attendance: dto.attendance,
      assignment: dto.assignment,
      created_at: new Date(),
      updated_at: new Date(),
      user_uuid: existUser.uuid,
      seminar_uuid: dto.seminar_uuid,
    };
    return await this.seminarProgressRepo.save(saveDto);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  find(findOptions?: object) {
    return this.seminarProgressRepo.find(findOptions);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(findOptions: object) {
    return await this.seminarProgressRepo.findOne(findOptions);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async update(findOptions: object, dto: SeminarProgressDto) {
    const saveDto = Object.assign(dto, { updated_at: new Date() });
    return await this.seminarProgressRepo.update(findOptions, saveDto);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  delete(findOptions: object) {
    return this.seminarProgressRepo.delete(findOptions);
  }
}
