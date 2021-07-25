import { Module } from '@nestjs/common';
import { SeminarRegistrationController } from './seminar-registration.controller';
import { SeminarRegistrationService } from './seminar-registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeminarRegistration } from './seminar-registration.entity';
import { AccountModule } from '../account/account.module';
import { SeminarModule } from '../seminar/seminar.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeminarRegistration]),
    AccountModule,
    SeminarModule,
  ],
  controllers: [SeminarRegistrationController],
  providers: [SeminarRegistrationService],
  exports: [SeminarRegistrationService],
})
export class SeminarRegistrationModule {}
