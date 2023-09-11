import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class AttachmentValueDto implements Idto {
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
  language: any;

  
}
