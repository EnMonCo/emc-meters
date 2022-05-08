import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MetersService } from './meters.service';
import { UpdateMeterDto } from './dto/update-meter.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserGuard } from '../users/auth-user.guard';

// TODO: make http controller
@ApiBearerAuth()
@ApiTags('Users')
// TODO: check user guard
@Controller({
  path: 'meters',
  version: '1',
})
export class MetersController {
  constructor(private readonly metersService: MetersService) {}

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async findAll(
  //   // userId: number,
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  // ) {
  //   if (limit > 50) {
  //     limit = 50;
  //   }
  //
  //   return infinityPagination(
  //     await this.metersService.findManyWithPagination(userId, {
  //       page,
  //       limit,
  //     }),
  //     { page, limit },
  //   );
  // }

  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Param('id') id: string) {
  //   return this.metersService.findOne({ id });
  // }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateMeterDto: UpdateMeterDto) {
    return this.metersService.update(updateMeterDto.id, updateMeterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metersService.softDelete(id);
  }

  @Get('test')
  @UseGuards(AuthUserGuard)
  test(@Request() req) {
    return req.user;
  }
}
