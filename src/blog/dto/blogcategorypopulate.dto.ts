import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { BlogCategoryDto } from './blogcategory.dto';


export class BlogCategoryPopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
    language: LanguageDto;

    @ApiProperty({ example: '1', description: 'type object', type: BlogCategoryDto })
    typeobject: BlogCategoryDto;

    @ApiProperty({
        example: '1',
        description: 'Name',
        type: 'string',
    })
    name: string;

}
