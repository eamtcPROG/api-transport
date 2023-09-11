import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LabelValueDto } from './labelvalue.dto';

export class LabelDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({
    example: 'name xxxx',
    description: 'Identifier',
    type: 'string',
  })
  identifier: string;

  @ApiProperty({ example: '1', description: 'Type', type: 'number' })
  type: number;

  @ApiProperty({ example: '1', description: 'Status', type: 'number' })
  status: number;

  @ApiProperty({ description: 'LabelValueDto', type: 'array' })
  allvalues?: Array<LabelValueDto>;
  value?: string;
  idlanguage?: string;
  language: any;
}
