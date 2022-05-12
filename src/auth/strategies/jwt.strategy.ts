import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Meter } from '../../meters/entities/meter.entity';
import { MetersService } from '../../meters/meters.service';

type JwtPayload = Pick<Meter, 'id' | 'userId'> & { iat: number; exp: number };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private meterService: MetersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'),
    });
  }

  public async validate(payload: JwtPayload) {
    if (!payload.id) {
      throw new UnauthorizedException();
    }

    // TODO: id check

    const meter = await this.meterService.findOne({ id: payload.id });

    if (!meter) {
      throw new NotFoundException('meter:notFound');
    }

    return meter;
  }
}
