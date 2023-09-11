import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {CurrencyDto} from './currency.dto';
import {CurrencyValueDto} from './currencyvalue.dto';


export class LinkCurrencyDto implements Idto {
    
    @ApiProperty({
        example: 'Currency',
        description: 'The type object',
        type: CurrencyDto,
      })
      type: CurrencyDto;

      @ApiProperty({
        example: 'CurrencyValue',
        description: 'The value object',
        type: CurrencyValueDto,
      })
      value: CurrencyValueDto;
}
