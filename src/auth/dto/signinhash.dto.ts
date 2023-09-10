import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class SignInHashDto implements Idto {
  @ApiProperty({ example: 'identifier-unique', description: 'Unique User Identifier', type: 'string' })
  id: string;

  @ApiProperty({ example: 'CS$%^VXCSHvghavsc#4', description: 'User password', type: 'string' })
  hash: string;
}
