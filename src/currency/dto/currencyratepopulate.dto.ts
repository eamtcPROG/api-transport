import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { CurrencyDto } from './currency.dto';


export class CurrencyRatePopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;
    
    @ApiProperty({ example: '2023-10-06', description: 'The date', type: Date })
    date: Date;

    @ApiProperty({ example: 'MDL', description: 'Identifier', type: 'string' })
    toidentifier: string;

    @ApiProperty({ example: 'MDL', description: 'Identifier', type: 'string' })
    fromidentifier: string;
    
    @ApiProperty({ example: '1', description: 'The rate of the exchange', type: 'number' })
    rate: number;

    @ApiProperty({
        example: '1',
        description: 'From Unique ID from currency table',
        type: 'string',
    })
    fromidcurrency: string;

    @ApiProperty({
        example: '1',
        description: 'To Unique ID from currency table',
        type: 'string',
    })
    toidcurrency: string;
}
