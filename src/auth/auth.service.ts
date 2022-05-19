import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthLoginDto } from './dto/auth-login.dto';
import { StatusEnum } from 'src/statuses/statuses.enum';
import * as crypto from 'crypto';
import { randomUUID } from 'crypto';
import { Status } from 'src/statuses/entities/status.entity';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { MetersService } from 'src/meters/meters.service';
import { Meter } from '../meters/entities/meter.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private metersService: MetersService,
    private configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateLogin(
    loginDto: AuthLoginDto,
  ): Promise<{ token: string; meter: Meter }> {
    const meter = await this.metersService.findOne({ id: loginDto.id });

    if (!meter) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      meter.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const token = this.jwtService.sign({
      id: meter.id,
      userId: meter.userId,
    });

    return { token, meter: meter };
  }

  async register(
    dto: AuthRegisterDto,
  ): Promise<{ meter: Meter; pairUrl: string; token: string }> {
    const id = randomUUID();
    const hash = crypto
      .createHash('sha256')
      .update(`${id}#${dto.serialNumber}`)
      .digest('hex');

    this.logger.log(`Registering meter with id: ${id}`);

    const meter = await this.metersService.create({
      id,
      ...dto,
      status: {
        id: StatusEnum.waiting_for_pairing,
      } as Status,
      hash,
    });

    const pairUrl = `${this.configService.get('app.frontendDomain')}/pair/${
      meter.hash
    }`;

    const token = this.jwtService.sign({
      id: meter.id,
      userId: meter.userId,
    });

    return { pairUrl, token, meter: meter };
  }

  async me(meter: Meter): Promise<Meter> {
    return this.metersService.findOne({
      id: meter.id,
    });
  }
}
