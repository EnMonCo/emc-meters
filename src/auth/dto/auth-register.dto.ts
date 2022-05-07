import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'My meter' })
  @IsOptional()
  name?: string | null;

  @ApiProperty({ example: 'SN-999' })
  @IsNotEmpty()
  serialNumber: string;
}
