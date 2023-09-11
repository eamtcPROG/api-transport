import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { MenuDto } from './menu.dto';


export class MenuPopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
    language: LanguageDto;

    @ApiProperty({ example: '1', description: 'type object', type: MenuDto })
    typeobject: MenuDto;

    @ApiProperty({
        example: 'test',
        description: 'The name of the menu',
        type: 'string',
    })
    name: string;
}
