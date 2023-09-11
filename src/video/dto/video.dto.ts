import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class VideoDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'Status of video', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'The order of video', type: 'number' })
    ordercriteria: number;

    @ApiProperty({ example: '1', description: 'Unique ID of the file', type: 'string' })
    idfile?: string;

    @ApiProperty({ example: '1', description: 'parent type', type: 'string' })
    parent: string;

    @ApiProperty({ example: '1', description: 'Unique ID of the parent', type: 'string' })
    idparent: string;


    @ApiProperty({ example: 'true', description: 'Is default', type: 'boolean' })
    isdefault: boolean;
    
    @ApiProperty({  description: 'Values', type: 'any' })
    allvalues?: any;
  idlanguage: any;
  name: any;
  language: any;

  fileInfoObj?: any;
  
    videolocation?: string;
    videoserver?: string;
    videoid?: string;

}
