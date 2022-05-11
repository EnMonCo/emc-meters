import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { MetersService } from './meters.service';

@Injectable()
export class VerifyMeterIdParamGuard implements CanActivate {
  constructor(@Inject(MetersService) private metersService: MetersService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const meter = request.meter;
    return meter.id === request.params.meterId;
  }
}
