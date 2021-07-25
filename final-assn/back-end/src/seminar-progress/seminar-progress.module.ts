import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeminarProgress } from './seminar-progress.entity';
import { AccountModule } from '../account/account.module';
import { SeminarModule } from '../seminar/seminar.module';
import { SeminarProgressController } from './seminar-progress.controller';
import { SeminarProgressService } from './seminar-progress.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeminarProgress]),
    AccountModule,
    SeminarModule,
  ],
  controllers: [SeminarProgressController],
  providers: [SeminarProgressService],
  exports: [SeminarProgressService],
})
export class SeminarProgressModule {}
