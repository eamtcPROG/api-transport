import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class SignInDto implements Idto {
  @ApiProperty({ example: 'identifier-unique', description: 'Unique User Identifier', type: 'string' })
  identifier: string;

  @ApiProperty({ example: 'CS$%^VXCSHvghavsc#4', description: 'User password', type: 'string' })
  password: string;
}
