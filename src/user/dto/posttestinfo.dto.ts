import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostTestInfoDto implements Idto {
  
  @ApiProperty({ example: 'name xxxx', description: 'name', type: 'string' })
  name: string;

  @ApiProperty({ example: 'info xxxx', description: 'info', type: 'string' })
  info: string;

  //....
}
