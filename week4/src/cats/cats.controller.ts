import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService){}

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto){
  //   this.catsService.create(createCatDto);
  //   return 'save cats'
  // }

  // @Get()
  // async findAll(): Promise<Cat[]>{
  //   return this.catsService.findAll();
  // }
  @Post()
  create(@Query() CreateCatDto: CreateCatDto) {
    this.catsService.create(CreateCatDto);
    return 'This action adds a new cat';
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
}