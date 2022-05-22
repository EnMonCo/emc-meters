import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserMetersService } from './user-meters.service';
import { UpdateUserMeterDto } from './dto/update-user-meter.dto';
import { MetersService } from '../meters/meters.service';
import { AuthUserGuard } from '../users/auth-user.guard';
import { UserOwnsMeterGuard } from './user-owns-meter.guard';
import { VerifyUserIdParamGuard } from './verify-user-id-param.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('UserMeters')
@Controller({
  path: 'users/:userId/meters',
  version: '1',
})
@UseGuards(AuthUserGuard, VerifyUserIdParamGuard)
export class UserMetersController {
  constructor(
    private readonly userMetersService: UserMetersService,
    private readonly metersService: MetersService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'userId', type: 'number', required: true })
  async findAll(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return await this.userMetersService.findManyWithPagination(userId, {
      page,
      limit,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserOwnsMeterGuard)
  findOne(
    @Param('id') id: string,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.metersService.findOne({ id, userId });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserOwnsMeterGuard)
  update(
    @Param('id') id: string,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserMeterDto: UpdateUserMeterDto,
  ) {
    return this.metersService.update(id, updateUserMeterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserOwnsMeterGuard)
  remove(
    @Param('id') id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.metersService.softDelete(id);
  }

  @Post(':hash/pair')
  @HttpCode(HttpStatus.OK)
  pair(
    @Param('hash') hash: string,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userMetersService.pair(hash, userId);
  }
}
