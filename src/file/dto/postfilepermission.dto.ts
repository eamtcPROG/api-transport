import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostFilePermissionDto implements Idto {
  
  @ApiProperty({ example: 'criteria xxxx', description: 'criteria', type: 'string' })
  criteria: string;

  @ApiProperty({ example: 'value xxxx', description: 'value', type: 'string' })
  value: string;

  
  //....
}
