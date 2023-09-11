import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class CurrencyDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'Status', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'The order', type: 'number' })
    ordercriteria: number;

    @ApiProperty({ example: '498', description: 'Num code', type: 'string' })
    numcode: string;

    @ApiProperty({ example: 'MDL', description: 'Identifier', type: 'string' })
    identifier: string;
  allvalues: any;
  idlanguage: any;
  name: any;
  language: any;

    
}
