import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostRoleDto implements Idto {
 
  @ApiProperty({ example: 'name xxxx', description: 'name', type: 'string' })
  name: string;

  @ApiProperty({ example: 'true', description: 'fixed', type: 'boolean' })
  fixed: boolean;

  //....
}
