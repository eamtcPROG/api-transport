import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { GalleryDto } from './gallery.dto';


export class GalleryPopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
    language: LanguageDto;

    @ApiProperty({ example: '1', description: 'type object', type: GalleryDto })
    typeobject: GalleryDto;

    @ApiProperty({
        example: 'test',
        description: 'The name of the gallery',
        type: 'string',
    })
    name: string;
}
