import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateShortTermDataDto } from './dto/create-short-term-data.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { VerifyMeterIdParamGuard } from '../meters/verify-meter-id-param.guard';
import { AuthUserGuard } from '../users/auth-user.guard';
import { UserOwnsMeterGuard } from '../user-meters/user-owns-meter.guard';
import { GetDataQueryDto } from './dto/get-data-query.dto';

@ApiBearerAuth()
@ApiTags('Data')
@Controller({
  path: 'meters/:meterId/data',
  version: '1',
})
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), VerifyMeterIdParamGuard)
  @HttpCode(HttpStatus.OK)
  async addData(
    @Param('meterId') meterId: string,
    @Body() data: CreateShortTermDataDto[],
  ) {
    await this.dataService.addData(meterId, data);
    return;
  }

  @Get()
  @UseGuards(AuthUserGuard, UserOwnsMeterGuard)
  @HttpCode(HttpStatus.OK)
  async getData(
    @Param('meterId') meterId: string,
    @Query() { from, to }: GetDataQueryDto,
  ) {
    return this.dataService.getData(meterId, from, to);
  }
}
