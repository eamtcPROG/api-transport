import { Inject, Injectable, forwardRef } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';
import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export default class RequestSortCriteriaDTO {
  @ApiProperty({ description: 'field key', type: 'string', required: true })
  field: string;

  @ApiProperty({
    description: 'direction',
    type: 'boolean',
    required: false,
  })
  asc?: boolean;

  getRequestSortCriteria(field: string, asc: boolean) {
    this.field = field;
    this.asc = asc;
    return this;
  }

    
}
