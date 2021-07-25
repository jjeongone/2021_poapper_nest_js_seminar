import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Account } from '../account/account.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'account_types',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const account: any = request.user;

    const isAuthorized = requiredRoles.some((type) =>
      account.account_type?.includes(type),
    );

    if (!isAuthorized) {
      throw new UnauthorizedException('Unauthorized AccountType');
    }

    return isAuthorized;
  }
}
