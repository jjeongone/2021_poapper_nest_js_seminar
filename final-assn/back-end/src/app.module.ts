import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeminarModule } from './seminar/seminar.module';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeminarRegistrationModule } from './seminar-registration/seminar-registration.module';
import { AuthModule } from './auth/auth.module';
import { SeminarProgressModule } from './seminar-progress/seminar-progress.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db-dev.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AccountModule,
    SeminarModule,
    SeminarRegistrationModule,
    AuthModule,
    SeminarProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
