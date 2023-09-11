import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostUserRoleDto implements Idto {
  
  @ApiProperty({ example: 'xxxx', description: 'Unique ID from user table', type: 'string' })
  iduser: string;

  @ApiProperty({ example: 'xxxx', description: 'Unique ID from role table', type: 'string' })
  idrole: string;

  //....
}
