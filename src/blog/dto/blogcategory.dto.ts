import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class BlogCategoryDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'Status of blog category', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'The order of blog category', type: 'number' })
    ordercriteria: number;

    @ApiProperty({
        example: 'AAAA',
        description: 'Hierarchy code generated from the parent',
        type: 'string'
    })
    code: string;

    @ApiProperty({ example: '1', description: 'Hierarchy level', type: 'number' })
    level: number;

    @ApiProperty({ example: '1', description: 'The ID of the parent', type: 'string' })
    idparent: string;

    @ApiProperty({ example: '1', description: 'Unique ID type blog category', type: 'string' })
    idtypeblogcategory: string;
  allvalues: any;
  idlanguage: any;
  language: any;
  name: any;
  typeblogcategory: any;
}
