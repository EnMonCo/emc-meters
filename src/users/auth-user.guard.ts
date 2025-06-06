import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException('user:auth:no-token');
    }
    const jwt = request.headers.authorization.split('Bearer ')[1];
    if (!jwt) {
      return false;
    }
    request.user = await this.usersService.verifyUser(jwt);
    return true;
  }
}
