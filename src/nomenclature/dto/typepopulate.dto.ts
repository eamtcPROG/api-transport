import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import GeneralNomenclatureDto from './generalnomenclature.dto';

export class TypePopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
    language: LanguageDto;

    @ApiProperty({ example: '1', description: 'type object', type: GeneralNomenclatureDto })
    typeobject: GeneralNomenclatureDto;

    // @ApiProperty({ example: '1', description: 'Attribute', type: 'string' })
    // attribute: string;

    @ApiProperty({ example: 'Name', description: 'The value of the label', type: 'string' })
    name: string;
}
