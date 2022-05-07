import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Status } from '../../statuses/entities/status.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateMeterDto {
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'My meter' })
  @IsOptional()
  name?: string | null;

  @ApiProperty({ example: 'SN-999' })
  serialNumber: string;

  hash: string | null;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;
}
