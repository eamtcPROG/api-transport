import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { BlogDto } from './blog.dto';


export class BlogPopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
    language: LanguageDto;

    @ApiProperty({ example: '1', description: 'type object', type: BlogDto })
    typeobject: BlogDto;

    // @ApiProperty({ example: '1', description: 'Attribute', type: 'string' })
    // attribute: string;

    @ApiProperty({ example: 'Name', description: 'The value of the label', type: 'string' })
    name: string;

    @ApiProperty({
        example: 'test',
        description: 'The url of the blog',
        type: 'string',
    })
    url: string;

    @ApiProperty({
        example: 'test',
        description: 'The title of the blog',
        type: 'string',
    })
    title: string;

    @ApiProperty({
        example: 'test',
        description: 'The key meta of the blog',
        type: 'string',
    })
    keymeta: string;

    @ApiProperty({
        example: 'test',
        description: 'The description meta of the blog',
        type: 'string',
    })
    descriptionmeta: string;

    @ApiProperty({
        example: 'test',
        description: 'The content of the blog',
        type: 'string',
    })
    content: string;
}
