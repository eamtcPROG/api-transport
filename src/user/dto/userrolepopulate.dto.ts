import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class UserRolePopulateDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: 'xxxx', description: 'Unique ID from user table', type: 'string' })
  iduser: string;

  @ApiProperty({ example: 'xxxx', description: 'Unique ID from role table', type: 'string' })
  idrole: string;

  @ApiProperty({ example: 'xxxx', description: 'Role name', type: 'string' })
  name: string;

  //....
}
