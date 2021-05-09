import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { async } from 'rxjs';

describe('Cat Controller', () => {
  let catController: CatController;
  let catModule: TestingModule;

  const catDto1 = {
    name: 'test cat',
  };
  const catDto2 = {
    name: 'new test cat',
  };

  beforeAll(async () => {
    catModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Cat],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Cat]),
      ],
      controllers: [CatController],
      providers: [CatService],
    }).compile();

    catController = catModule.get<CatController>(CatController);
  });

  afterAll(async () => {
    catModule.close();
  });

  describe('GET empty', () => {
    it('should return empty arr', async () => {
      expect(await catController.getAll()).toEqual([]);
    });
  });

  describe('POST one cat', () => {
    it('should create cat entity', async () => {
      expect(await catController.post(catDto1)).toEqual({
        id: 1,
        name: 'test cat',
      });
    });
    it('should get a cat entity', async () => {
      expect(await catController.getOne('1')).toEqual({
        id: 1,
        name: 'test cat',
      });
    });
  });

  describe('PUT one cat', () => {
    it('should update a cat entity', async () => {
      expect(await catController.put('1', catDto2)).toEqual('new test cat');
    });
  });

  describe('DELETE one cat', () => {
    it('should delete a cat entity', async () => {
      expect(await catController.delete('1')).toEqual({ raw: [] });
    });
  });
});
