import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { MetersService } from '../meters/meters.service';

@Injectable()
export class VerifyUserIdParamGuard implements CanActivate {
  constructor(@Inject(MetersService) private metersService: MetersService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.id === +request.params.userId;
  }
}
