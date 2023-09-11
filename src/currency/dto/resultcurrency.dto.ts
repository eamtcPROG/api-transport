import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ResultCurrencyDto implements Idto {

    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'Status of filter dictionary', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'The order of filter dictionary', type: 'number' })
    ordercriteria: number;

    @ApiProperty({
        example: '1',
        description: 'Unique ID from language table',
        type: 'string',
    })
    idlanguage: string;

    @ApiProperty({
        example: 'Romana',
        description: 'Language name',
        type: 'string',
    })
    language: string;

    @ApiProperty({
        example: '1',
        description: 'Unique ID from Currency table',
        type: 'string',
    })
    idcurrency: string;

    @ApiProperty({
        example: '1',
        description: 'Name',
        type: 'string',
    })
    name: string;

    @ApiProperty({ example: '498', description: 'Num code', type: 'string' })
    numcode: string;

    @ApiProperty({ example: 'MDL', description: 'Identifier', type: 'string' })
    identifier: string;
}
