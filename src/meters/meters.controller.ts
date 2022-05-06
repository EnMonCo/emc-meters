import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MetersService } from './meters.service';
import { CreateMeterDto } from './dto/create-meter.dto';
import { UpdateMeterDto } from './dto/update-meter.dto';

@Controller()
export class MetersController {
  constructor(private readonly metersService: MetersService) {}

  @MessagePattern('createMeter')
  create(@Payload() createMeterDto: CreateMeterDto) {
    return this.metersService.create(createMeterDto);
  }

  @MessagePattern('findAllMeters')
  findAll() {
    return this.metersService.findAll();
  }

  @MessagePattern('findOneMeter')
  findOne(@Payload() id: number) {
    return this.metersService.findOne(id);
  }

  @MessagePattern('updateMeter')
  update(@Payload() updateMeterDto: UpdateMeterDto) {
    return this.metersService.update(updateMeterDto.id, updateMeterDto);
  }

  @MessagePattern('removeMeter')
  remove(@Payload() id: number) {
    return this.metersService.remove(id);
  }
}
