import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {PageDto} from './page.dto';
import {PageValueDto} from './pagevalue.dto';


export class LinkPageDto implements Idto {
    
    @ApiProperty({
        example: 'Page',
        description: 'The type object',
        type: PageDto,
      })
      type: PageDto;

      @ApiProperty({
        example: 'PageValue',
        description: 'The value object',
        type: PageValueDto,
      })
      value: PageValueDto;
}
