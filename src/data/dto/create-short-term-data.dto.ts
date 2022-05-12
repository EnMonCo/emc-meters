import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShortTermDataDto {
  @ApiProperty({ example: 220 })
  @IsNotEmpty()
  voltage: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  power: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  line: number;
}
