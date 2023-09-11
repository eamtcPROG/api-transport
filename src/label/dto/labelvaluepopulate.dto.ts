import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { LabelDto } from './label.dto';

export class LabelValuePopulateDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
  language: LanguageDto;

  @ApiProperty({ example: '1', description: 'label', type:LabelDto })
  label: LabelDto;

  // @ApiProperty({ example: '1', description: 'Attribute', type: 'string' })
  // attribute: string;
  
  @ApiProperty({ example: 'Name', description: 'The value of the label', type: 'string' })
  value: string;
}
