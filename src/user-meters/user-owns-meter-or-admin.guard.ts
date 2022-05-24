import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { MetersService } from '../meters/meters.service';
import { StatusEnum } from '../statuses/statuses.enum';

@Injectable()
export class UserOwnsMeterOrAdminGuard implements CanActivate {
  constructor(@Inject(MetersService) private metersService: MetersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const isAdmin = user.role.id === 1;
    const fields: { id: string; status: number; userId?: number } = {
      id: request.params.meterId,
      status: StatusEnum.active,
    };
    if (!isAdmin) {
      fields.userId = user.id;
    }
    const meter = await this.metersService.findOne(fields);
    if (!meter) {
      return false;
    }
    return isAdmin || user.id === meter.userId;
  }
}
