import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { IsNotExistOnConstraint } from '../../utils/validators/is-not-exists-on-constraint.validator';
import { CreateMeterDto } from './create-meter.dto';
import { Status } from '../../statuses/entities/status.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class UpdateMeterDto extends PartialType(CreateMeterDto) {
  @ApiProperty({ example: 'My New Electric Meter' })
  @IsOptional()
  @Validate(IsNotExistOnConstraint, ['Meter', 'userId'], {
    message: 'nameAlreadyExists',
  })
  name?: string;

  @ApiProperty({ example: 10 })
  @IsOptional()
  userId?: number;

  @ApiProperty({ type: Status })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;
}
