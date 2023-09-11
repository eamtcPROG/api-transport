import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostPageDto implements Idto {
    
    @ApiProperty({ example: '1', description: 'Type of page', type: 'number' })
    type: number;
  
    @ApiProperty({ example: '1', description: 'Status of page', type: 'number' })
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
    idpage?: string;

    @ApiProperty({
        example: 'test',
        description: 'The name of the page',
        type: 'string',
    })
    name: string;

    @ApiProperty({
        example: 'test',
        description: 'The url of the page',
        type: 'string',
    })
    url: string;

    @ApiProperty({
        example: 'test',
        description: 'The title of the page',
        type: 'string',
    })
    title: string;

    @ApiProperty({
        example: 'test',
        description: 'The key meta of the page',
        type: 'string',
    })
    keymeta: string;

    @ApiProperty({
        example: 'test',
        description: 'The description meta of the page',
        type: 'string',
    })
    descriptionmeta: string;

    @ApiProperty({
        example: 'test',
        description: 'The content of the page',
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
}
