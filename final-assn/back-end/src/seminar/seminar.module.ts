import { Module } from '@nestjs/common';
import { SeminarController } from './seminar.controller';
import { SeminarService } from './seminar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seminar } from './seminar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seminar])],
  controllers: [SeminarController],
  providers: [SeminarService],
  exports: [SeminarService],
})
export class SeminarModule {}
