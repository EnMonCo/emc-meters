import { ApiProperty } from '@nestjs/swagger';

export class GetDataQueryDto {
  @ApiProperty()
  from: number;

  @ApiProperty()
  to: number;
}
