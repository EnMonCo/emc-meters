import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserMeterDto {
  @ApiProperty({ example: 'My meter' })
  @IsOptional()
  name?: string | null;
}
