import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PageDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: '1', description: 'Type of page', type: 'number' })
  type: number;

  @ApiProperty({ example: '1', description: 'Status of page', type: 'number' })
  status: number;

  @ApiProperty({ example: '1', description: 'Unique ID gallery', type: 'string' })
  idgallery: string;

  @ApiProperty({ example: '1', description: 'Unique ID attachment', type: 'string' })
  idattachment: string;

  @ApiProperty({ example: '1', description: 'Unique ID video', type: 'string' })
  idvideo: string;
  allvalues?: any;
  idlanguage?: any;
  name?: any;
  language?: any;
  url?: any;
  title?: any;
  keymeta?: any;
  
  descriptionmeta?: any;
  content?: any;
  fullurl?: string;

  attachment?: any;
  video?: any;
  gallery?: any;
}
