import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { FAQDto } from './faq.dto';


export class FAQPopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
    language: LanguageDto;

    @ApiProperty({ example: '1', description: 'type object', type: FAQDto })
    typeobject: FAQDto;

    @ApiProperty({
        example: '1',
        description: 'Question',
        type: 'string',
    })
    question: string;

    @ApiProperty({
        example: '1',
        description: 'Answer',
        type: 'string',
    })
    answer: string;
 
}
