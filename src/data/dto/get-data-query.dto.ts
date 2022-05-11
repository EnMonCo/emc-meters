import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class GetDataQueryDto {
  @ApiProperty()
  @IsDate()
  from: Date;

  @ApiProperty()
  @IsDate()
  to: Date;
}
