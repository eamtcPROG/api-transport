import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class BlogDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'Type of blog', type: 'number' })
    type: number;
  
    @ApiProperty({ example: '1', description: 'Status of blog', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'Unique ID gallery', type: 'string' })
    idgallery: string;

    @ApiProperty({ example: '1', description: 'Unique ID attachment', type: 'string' })
    idattachment: string;

    @ApiProperty({ example: '1', description: 'Unique ID video', type: 'string' })
    idvideo: string;

    @ApiProperty({ example: '1', description: 'Unique ID blog category', type: 'string' })
    idblogcategory:string;
  allvalues: any;
  idlanguage: any;
  name: any;
  url: any;
  title: any;
  keymeta: any;
  descriptionmeta: any;
  content: any;
  blogcategory: any;
  attachment: any;
  gallery: any;
  video: any;
  language: any;
  fullurl: any;
}
