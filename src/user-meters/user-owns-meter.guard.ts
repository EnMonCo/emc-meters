import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { MetersService } from '../meters/meters.service';

@Injectable()
export class UserOwnsMeterGuard implements CanActivate {
  constructor(@Inject(MetersService) private metersService: MetersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const meter = await this.metersService.findOne({
      id: request.params.meterId,
      userId: user.id,
    });
    if (!meter) {
      return false;
    }
    return user.id === meter.userId;
  }
}
