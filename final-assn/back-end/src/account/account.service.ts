import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { AccountDto } from './account.dto';
import * as crypto from 'crypto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  async save(dto: AccountDto) {
    const cryptoSalt = crypto.randomBytes(64).toString('base64');
    const encryptedPassword = crypto
      .pbkdf2Sync(dto.password, cryptoSalt, 999, 64, 'sha512')
      .toString('base64');

    const saveDto = Object.assign(dto, {
      crypto_salt: cryptoSalt,
      password: encryptedPassword,
      created_at: new Date(),
    });
    return await this.accountRepo.save(saveDto);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  find(findOptions?: object) {
    return this.accountRepo.find(findOptions);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(findOptions: object) {
    return await this.accountRepo.findOne(findOptions);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async update(findOptions: object, dto: AccountDto) {
    return await this.accountRepo.update(findOptions, dto);
  }

  async updateLoginById(id: string) {
    const existUser = await this.accountRepo.findOne({ id: id });
    if (!existUser) {
      throw new BadRequestException();
    } else {
      this.accountRepo.update(
        { uuid: existUser.uuid, id: existUser.id, email: existUser.email },
        { last_login_at: new Date() },
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  delete(findOptions: object) {
    return this.accountRepo.delete(findOptions);
  }
}
