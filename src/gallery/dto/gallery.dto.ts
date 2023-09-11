import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class GalleryDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'Status of gallery', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'The order of gallery', type: 'number' })
    ordercriteria: number;

    @ApiProperty({ example: '1', description: 'Unique ID of the file', type: 'string' })
    idfile: string;

    @ApiProperty({ example: '1', description: 'parent type', type: 'string' })
    parent: string;

    @ApiProperty({ example: '1', description: 'Unique ID of the parent', type: 'string' })
    idparent: string;


    @ApiProperty({ example: 'true', description: 'Is default', type: 'boolean' })
  isdefault: boolean;
  
  allvalues: any;
  idlanguage: any;

  name?: any;
  language?: any;

  fileInfoObj?: any;

}
