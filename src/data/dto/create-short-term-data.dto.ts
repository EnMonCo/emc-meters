import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShortTermDataDto {
  @ApiProperty()
  @IsNotEmpty()
  voltage: number;

  @ApiProperty()
  @IsNotEmpty()
  power: number;

  @ApiProperty()
  @IsNotEmpty()
  line: number;
}
