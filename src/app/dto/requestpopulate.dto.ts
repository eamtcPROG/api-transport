import { Inject, Injectable, forwardRef } from '@nestjs/common';
import Idto from '../interfaces/idto.interface';
import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';
import RequestFilterDTO from './requestfilter.dto';
import RequestSortCriteriaDTO from './requestsortcriteria.dto';

@Injectable()
export default class RequestPopulateDTO {
  @ApiProperty({
    description: 'Populate elements',
    type: 'string',
    isArray: true,
  })
  populates?: string[];

  addToPopulates(data: any) {
    this.populates = this.populates ?? [];
    if (Array.isArray(data)) {
      this.populates = [...this.populates, ...data];
      return;
    }
    this.populates.push(data);
  }
}
