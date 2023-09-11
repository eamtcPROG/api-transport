import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class CurrencyValueDto implements Idto {
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
        description: 'Unique ID from currency table',
        type: 'string',
    })
    idcurrency: string;

    @ApiProperty({
        example: 'test 1',
        description: 'Name',
        type: 'string',
    })
    name: string;
  language: any;

    
  
}
