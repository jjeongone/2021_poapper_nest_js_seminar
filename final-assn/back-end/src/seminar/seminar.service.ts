import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seminar } from './seminar.entity';
import { Repository } from 'typeorm';
import { SeminarDto } from './seminar.dto';

@Injectable()
export class SeminarService {
  constructor(
    @InjectRepository(Seminar)
    private readonly seminarRepo: Repository<Seminar>,
  ) {}

  async save(dto: SeminarDto) {
    const saveDto = Object.assign(dto, {
      created_at: new Date(),
      updated_at: new Date(),
    });
    return await this.seminarRepo.save(saveDto);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  find(findOptions?: object) {
    return this.seminarRepo.find(findOptions);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(findOptions: object) {
    return await this.seminarRepo.findOne(findOptions);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async update(findOptions: object, dto: SeminarDto) {
    const saveDto = Object.assign(dto, { updated_at: new Date() });
    return await this.seminarRepo.update(findOptions, saveDto);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  delete(findOptions: object) {
    return this.seminarRepo.delete(findOptions);
  }
}
