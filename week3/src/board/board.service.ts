import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Board} from "./board.entity";
import {BoardDto} from "./board.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepo: Repository<Board>,
        private readonly userService: UserService
    ) {
    }

    find(){
        return this.boardRepo.find({relations: ["user", "users"]});
    }

    async findOne(id: string){
        const currentBoard = await this.boardRepo.findOne({id: id});
        const updateViews = currentBoard.views + 1;
        await this.boardRepo.update({id: id}, {
            views: updateViews
        });

        return this.boardRepo.findOne({id: id}, {relations: ["users"]});
    }

    // // OneToMany/ManyToOne
    // async save(dto: BoardDto){
    //     const existUser = await this.userService.findOne(dto.user_id);
    //
    //     return this.boardRepo.save({
    //         title: dto.title,
    //         content: dto.content,
    //         views: 0,
    //         user: existUser
    //     })
    // }

    // ManyToMany
    async save(dto: BoardDto) {
        let existUsers = new Array;
        for (let user_id of dto.user_ids) {
            const existUser = await this.userService.findOne(user_id)
            existUsers.push(existUser);
        }

        return this.boardRepo.save({
            title: dto.title,
            content: dto.content,
            views: 0,
            users: existUsers
        })
    }

    update(id: string, dto: BoardDto){
        return this.boardRepo.update({id: id}, {
            title: dto.title,
            content: dto.content
        });
    }

    delete(id: string){
        return this.boardRepo.delete({id: id});
    }
}
