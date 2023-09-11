import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostBlogCategoryDto implements Idto {

    @ApiProperty({
        example: '1',
        description: 'Unique ID from language table',
        type: 'string',
    })
    idlanguage: string;

   
    @ApiProperty({ example: '1', description: 'Status of blog category', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'The order of blog category', type: 'number' })
    ordercriteria: number;
    @ApiProperty({
        example: '1',
        description: 'Name',
        type: 'string',
    })
    name: string;
    
    @ApiProperty({ example: '1', description: 'The ID of the parent', type: 'string' })
    idparent: string;

    @ApiProperty({ example: '1', description: 'Unique ID type blog category', type: 'string' })
    idtypeblogcategory: string;

    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    idblogcategory?: string;
}
