import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class ResultAddDTO {
  
  @ApiProperty({
    description: 'Specific Object DTO',
    type: 'boolean',
  })
  added: boolean;
}
