import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { MetersService } from '../meters/meters.service';

@Injectable()
export class VerifyUserIdParamOrAdminGuard implements CanActivate {
  constructor(@Inject(MetersService) private metersService: MetersService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const isAdmin = user.role.id === 1;
    return isAdmin || user.id === +request.params.userId;
  }
}
