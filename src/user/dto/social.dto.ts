import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class SocialDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: 'http:\\facebook.com/test', description: 'The link of social', type: 'string' })
  link: string;

  @ApiProperty({ example: '1', description: 'Unique ID from TypeSocial', type: 'string' })
  idtypesocial: string;

  typesocial?: any;
  
  iduser?: string;
  //....
}
