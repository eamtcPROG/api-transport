import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostFAQDto implements Idto {

    @ApiProperty({
        example: '1',
        description: 'Unique ID from language table',
        type: 'string',
    })
    idlanguage: string;

    @ApiProperty({
        example: '1',
        description: 'Question',
        type: 'string',
    })
    question: string;

    @ApiProperty({
        example: '1',
        description: 'Answer',
        type: 'string',
    })
    answer: string;

    @ApiProperty({ example: '1', description: 'Status of faq', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'The order of faq', type: 'number' })
    ordercriteria: number;

    @ApiProperty({ example: '1', description: 'The type of faq', type: 'number' })
    type: number;

    @ApiProperty({ example: '1', description: 'The ID object', type: 'string' })
    idobject: string;

    @ApiProperty({ example: '1', description: 'Unique ID gallery', type: 'string' })
    idgallery: string;

    @ApiProperty({ example: '1', description: 'Unique ID attachment', type: 'string' })
    idattachment: string;

    @ApiProperty({ example: '1', description: 'Unique ID video', type: 'string' })
    idvideo: string;

    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    idfaq?: string;
}
