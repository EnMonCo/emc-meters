import { Controller } from '@nestjs/common';
import { MetersService } from './meters.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// TODO: what should be purpose for this controller?
@ApiBearerAuth()
@ApiTags('Meters')
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

  // @Patch(':id')
  // @HttpCode(HttpStatus.OK)
  // update(@Param('id') id: string, @Body() updateMeterDto: UpdateMeterDto) {
  //   return this.metersService.update(updateMeterDto.id, updateMeterDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.metersService.softDelete(id);
  // }
}
