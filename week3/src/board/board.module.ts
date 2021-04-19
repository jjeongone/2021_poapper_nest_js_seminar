import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import {Board} from "./board.entity";
import {UserModule} from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Board]), UserModule],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
