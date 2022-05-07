import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMeterDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'My meter' })
  @IsOptional()
  name: string | null;

  @ApiProperty({ example: 'SN-999' })
  serialNumber: string;

  hash: string | null;
}
