import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {MenuDto} from './menu.dto';
import {MenuValueDto} from './menuvalue.dto';


export class LinkMenuDto implements Idto {
    
    @ApiProperty({
        example: 'Menu',
        description: 'The type object',
        type: MenuDto,
      })
      type: MenuDto;

      @ApiProperty({
        example: 'MenuValue',
        description: 'The value object',
        type: MenuValueDto,
      })
      value: MenuValueDto;
}
