import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthMeterGuard } from './auth-meter.guard';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(public service: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: AuthLoginDto) {
    return this.service.validateLogin(loginDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: AuthRegisterDto) {
    return this.service.register(createUserDto);
  }

  @ApiBearerAuth()
  @Get('me')
  @UseGuards(AuthMeterGuard)
  @HttpCode(HttpStatus.OK)
  public async me(@Request() request) {
    return this.service.me(request.meter);
  }
}
