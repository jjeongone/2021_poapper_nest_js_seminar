import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Profile} from "./profile.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {ProfileDto} from "./profile.dto";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepo: Repository<Profile>,
        private readonly userService: UserService
    ) {
    }

    find(){
        return this.profileRepo.find({relations: ["user"]});
    }

    findOne(id: string){
        return this.profileRepo.findOne({id: id});
    }

    async save(dto: ProfileDto) {
        const existUser = await this.userService.findOne(dto.user_id);

        return this.profileRepo.save({
            gender: dto.gender,
            user: existUser,
            user_id: dto.user_id
        })
    }

    update(id: string, dto: ProfileDto) {
        return this.profileRepo.update({id: id}, {
            gender: dto.gender,
            user_id: dto.user_id
        })
    }

    delete(id: string) {
        return this.profileRepo.delete({id: id});
    }

}
