import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { AttachmentDto } from './attachment.dto';


export class AttachmentPopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
    language: LanguageDto;

    @ApiProperty({ example: '1', description: 'type object', type: AttachmentDto })
    typeobject: AttachmentDto;

    @ApiProperty({
        example: 'test',
        description: 'The name of the attachment',
        type: 'string',
    })
    name: string;
}
