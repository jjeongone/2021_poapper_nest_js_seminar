import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: "db-dev.sqlite",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
      BoardModule,
      ProfileModule,
      UserModule,
  ],
  controllers: [AppController, ProfileController, UserController],
  providers: [AppService],
})
export class AppModule {}
