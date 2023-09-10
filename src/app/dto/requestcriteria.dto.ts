import { Inject, Injectable, forwardRef } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';
import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class RequestCriteriaDTO {
  @ApiProperty({ description: 'field key', type: 'string', required: true })
  id: string;

  @ApiProperty({
    description: 'values list',
    type: 'string',
    isArray: true,
    required: true,
  })
  values: string[];
}
