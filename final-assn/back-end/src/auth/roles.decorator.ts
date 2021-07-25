import { AccountType } from '../account/account.meta';
import { SetMetadata } from '@nestjs/common';

export const AccountRoles = (...types: AccountType[]) =>
  SetMetadata('account_types', types);
