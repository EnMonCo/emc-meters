import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class AuthLoginDto {
  @ApiProperty({ example: '277b3eeb-d010-4839-b2f4-0370e6a4f276' })
  @Validate(IsExist, ['Meter'], {
    message: 'meter:notExists',
  })
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
