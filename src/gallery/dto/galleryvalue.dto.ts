import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class GalleryValueDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({
        example: '1',
        description: 'Unique ID from language table',
        type: 'string',
    })
    idlanguage: string;

    @ApiProperty({
        example: '1',
        description: 'Unique ID from gallery table',
        type: 'string',
    })
    idgallery: string;

    @ApiProperty({
        example: 'test',
        description: 'The name of the gallery',
        type: 'string',
    })
    name: string;
  language: any;

  
}
