import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MetersService } from './meters.service';
import { CreateMeterDto } from './dto/create-meter.dto';
import { UpdateMeterDto } from './dto/update-meter.dto';
import { infinityPagination } from '../utils/infinity-pagination';

@Controller()
export class MetersController {
  constructor(private readonly metersService: MetersService) {}

  @MessagePattern('createMeter')
  create(@Payload() createMeterDto: CreateMeterDto) {
    return this.metersService.create(createMeterDto);
  }

  @MessagePattern('findAllMeters')
  async findAll(userId: number, page: number, limit: number) {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.metersService.findManyWithPagination(userId, {
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @MessagePattern('findOneMeter')
  findOne(@Payload() id: string) {
    return this.metersService.findOne({ id });
  }

  @MessagePattern('updateMeter')
  update(@Payload() updateMeterDto: UpdateMeterDto) {
    return this.metersService.update(updateMeterDto.id, updateMeterDto);
  }

  @MessagePattern('removeMeter')
  remove(@Payload() id: string) {
    return this.metersService.softDelete(id);
  }
}
