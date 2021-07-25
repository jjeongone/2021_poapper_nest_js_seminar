import { AccountType } from './account.meta';

export class AccountDto {
  readonly email: string;
  readonly id: string;
  readonly name: string;
  readonly password: string;
  readonly account_type: AccountType;
}
