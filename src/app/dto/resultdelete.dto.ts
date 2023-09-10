import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class ResultDeleteDTO {
  
  @ApiProperty({
    description: 'Specific Object DTO',
    type: 'boolean',
  })
  deleted: boolean;
}
