import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {FAQDto} from './faq.dto';
import {FAQValueDto} from './faqvalue.dto';


export class LinkFAQDto implements Idto {
    
    @ApiProperty({
        example: 'FAQ',
        description: 'The type object',
        type: FAQDto,
      })
      type: FAQDto;

      @ApiProperty({
        example: 'FAQValue',
        description: 'The value object',
        type: FAQValueDto,
      })
      value: FAQValueDto;
}
