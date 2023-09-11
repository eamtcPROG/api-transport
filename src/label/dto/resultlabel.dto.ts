import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LabelDto } from './label.dto';
import { LabelValueDto } from './labelvalue.dto';

export class ResultLabelDto implements Idto {
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

  @ApiProperty({
    example: 'Name',
    description: 'The value of the label',
    type: 'string',
  })
  value: string;

  @ApiProperty({
    example: '1',
    description: 'Unique ID from language table',
    type: 'string',
  })
  idlanguage: string;

  // -------------------

//   @ApiProperty({ example: '', description: 'Label object', type: LabelDto })
//   labelobj: LabelDto;

//   @ApiProperty({
//     example: '',
//     description: 'LabelValue object',
//     type: LabelValueDto,
//     isArray: true,
//   })
//   labelvalueobjs: LabelValueDto[];
}
