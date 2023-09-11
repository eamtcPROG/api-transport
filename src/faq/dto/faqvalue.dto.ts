import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class FAQValueDto implements Idto {
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
        description: 'Unique ID from FAQ table',
        type: 'string',
    })
    idfaq: string;

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
  language: any;

  
}
