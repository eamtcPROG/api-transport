import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class RoleDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: 'name xxxx', description: 'name', type: 'string' })
  name: string;

  @ApiProperty({ example: 'true', description: 'fixed', type: 'boolean' })
  fixed: boolean;

  //....
}
