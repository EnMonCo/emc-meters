import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateShortTermDataDto } from './dto/create-short-term-data.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VerifyMeterIdParamGuard } from '../meters/verify-meter-id-param.guard';
import { AuthUserGuard } from '../users/auth-user.guard';
import { UserOwnsMeterGuard } from '../user-meters/user-owns-meter.guard';
import { GetDataQueryDto } from './dto/get-data-query.dto';
import { StatusEnum } from '../statuses/statuses.enum';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { AuthMeterGuard } from '../auth/auth-meter.guard';

@ApiBearerAuth()
@ApiTags('Data')
@Controller({
  path: 'meters/:meterId/data',
  version: '1',
})
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @UseGuards(AuthMeterGuard, VerifyMeterIdParamGuard)
  @HttpCode(HttpStatus.OK)
  @ApiImplicitBody({
    name: 'data',
    type: [CreateShortTermDataDto],
    content: {},
  })
  async addData(
    @Param('meterId') meterId: string,
    @Body() data: CreateShortTermDataDto[],
    @Request() req,
  ) {
    if (req.meter.status.id !== StatusEnum.active) {
      throw new BadRequestException('meter:notActive');
    }

    // check for unique lines
    const lines = new Set<number>();
    for (const d of data) {
      if (lines.has(d.line)) {
        throw new BadRequestException('data:duplicateLine');
      }
      lines.add(d.line);
    }
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
