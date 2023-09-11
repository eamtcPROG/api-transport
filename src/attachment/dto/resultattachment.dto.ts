import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ResultAttachmentDto implements Idto {
    
    @ApiProperty({ example: '1', description: 'Unique ID/When update this field is the id record from Page table', type: 'string' })
    id: string;
    
    @ApiProperty({ example: '1', description: 'Status of attachment', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'The order of attachment', type: 'number' })
    ordercriteria: number;

    @ApiProperty({ example: '1', description: 'Unique ID of the file', type: 'string' })
    idfile: string;

    @ApiProperty({ example: '1', description: 'Unique ID of the parent', type: 'string' })
    idparent: string;


    @ApiProperty({ example: 'true', description: 'Is default', type: 'boolean' })
    isdefault: boolean;
   
    @ApiProperty({
        example: '1',
        description: 'Unique ID from language table',
        type: 'string',
    })
    idlanguage: string;

    @ApiProperty({
        example: '1',
        description: 'Unique ID from attachment table',
        type: 'string',
    })
    idattachment: string;

    @ApiProperty({
        example: 'test',
        description: 'The name of the attachment',
        type: 'string',
    })
    name: string;
   
    @ApiProperty({
        example: 'romana',
        description: 'The name of the language',
        type: 'string',
    })
    language?: string;
}
