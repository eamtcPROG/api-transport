import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { CurrencyDto } from './currency.dto';


export class CurrencyPopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
    language: LanguageDto;

    @ApiProperty({ example: '1', description: 'type object', type: CurrencyDto })
    typeobject: CurrencyDto;

    @ApiProperty({
        example: '1',
        description: 'Name',
        type: 'string',
    })
    name: string;

    
 
}
