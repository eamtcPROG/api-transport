import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ResultBlogDto implements Idto {
    
    @ApiProperty({ example: '1', description: 'Unique ID/When update this field is the id record from Blog table', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'Type of blog', type: 'number' })
    type: number;
  
    @ApiProperty({ example: '1', description: 'Status of blog', type: 'number' })
    status: number;

    @ApiProperty({
        example: '1',
        description: 'Unique ID from language table',
        type: 'string',
    })
    idlanguage: string;

    @ApiProperty({
        example: '1',
        description: 'Unique ID from type table',
        type: 'string',
    })
    idblog: string;

    @ApiProperty({
        example: 'test',
        description: 'The name of the blog',
        type: 'string',
    })
    name: string;

    @ApiProperty({
        example: 'test',
        description: 'The url of the blog',
        type: 'string',
    })
    url: string;

    @ApiProperty({
        example: 'test',
        description: 'The title of the blog',
        type: 'string',
    })
    title: string;

    @ApiProperty({
        example: 'test',
        description: 'The key meta of the blog',
        type: 'string',
    })
    keymeta: string;

    @ApiProperty({
        example: 'test',
        description: 'The description meta of the blog',
        type: 'string',
    })
    descriptionmeta: string;

    @ApiProperty({
        example: 'test',
        description: 'The content of the blog',
        type: 'string',
    })
    content: string;
    //....

    @ApiProperty({ example: '1', description: 'Unique ID gallery', type: 'string' })
    idgallery: string;

    @ApiProperty({ example: '1', description: 'Unique ID attachment', type: 'string' })
    idattachment: string;

    @ApiProperty({ example: '1', description: 'Unique ID video', type: 'string' })
    idvideo: string;

    @ApiProperty({ example: '1', description: 'Unique ID blog category', type: 'string' })
    idblogcategory:string;

    @ApiProperty({
        example: 'Romana',
        description: 'Language name',
        type: 'string',
    })
    language?: string;
}
