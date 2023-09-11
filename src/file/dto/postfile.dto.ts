import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostFileDto implements Idto {
  

  @ApiProperty({ example: 'name xxxx', description: 'file name', type: 'string' })
  name: string;

  @ApiProperty({ example: 'img', description: 'type file', type: 'string' })
  type: string;

  @ApiProperty({ example: '21312321', description: 'Permissions for file', type: ['string'], isArray: true })
  permissions: string[];

  @ApiProperty({ example: 'src/home', description: 'The location of the file', type: 'string' })
  location: string;

  @ApiProperty({ example: 'local', description: 'Storage name of the file', type: 'string' })
  storage: string;

  @ApiProperty({ example: '4', description: 'The size of file', type: 'number' })
  size: number;

  @ApiProperty({ example: 'value', description: 'File value', type: 'string' })
  value: string;
  
  //....
}
