import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class BlogCategoryValueDto implements Idto {
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
        description: 'Unique ID from Blog Category table',
        type: 'string',
    })
    idblogcategory: string;

    @ApiProperty({
        example: '1',
        description: 'Name',
        type: 'string',
    })
    name: string;
  language: any;

    
  
}
