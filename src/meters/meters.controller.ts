import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
} from '@nestjs/common';
import { MetersService } from './meters.service';
import { UpdateMeterDto } from './dto/update-meter.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

// TODO: make http controller
@ApiBearerAuth()
@ApiTags('Users')
// TODO: check user guard
@Controller({
  path: 'meters',
  version: '1',
})
export class MetersController {
  constructor(
    private readonly metersService: MetersService,
    @Inject('EMC_ACCOUNTS') private readonly emcAccounts: ClientProxy,
  ) {}

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.metersService.findOne({ id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateMeterDto: UpdateMeterDto) {
    return this.metersService.update(updateMeterDto.id, updateMeterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metersService.softDelete(id);
  }

  // @Get('test')
  // test() {
  //   return this.emcAccounts.send(
  //     { cmd: 'auth.verifyUser' },
  //     { jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6eyJpZCI6MiwibmFtZSI6IlVzZXIiLCJfX2VudGl0eSI6IlJvbGUifSwiaWF0IjoxNjUyMDMyMzUzLCJleHAiOjE2NTIxMTg3NTN9.1HaArnmYv7daZU2gVLOcDZKHRXq2JjpAw8cAs7AHz8Y' },
  //   );
  // }
}
