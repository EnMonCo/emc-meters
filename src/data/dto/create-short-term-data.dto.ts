import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateShortTermDataDto {
  @ApiProperty({ example: 220 })
  @IsNotEmpty()
  @IsNumber()
  voltage: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  power: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  line: number;
}
