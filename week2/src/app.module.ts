import { Module } from '@nestjs/common';
import {CatsController} from './cats/cats.controller';
import {CatsService} from './cats/cats.service';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
