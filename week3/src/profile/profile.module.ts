import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../user/user.module";
import {Profile} from "./profile.entity";
import {ProfileController} from "./profile.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), UserModule],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService]
})
export class ProfileModule {}
