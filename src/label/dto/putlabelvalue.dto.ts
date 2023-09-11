import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PutLabelValueDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: '1', description: 'Unique ID from language table', type: 'string' })
  idlanguage: string;

  @ApiProperty({ example: '1', description: 'Unique ID from label table', type: 'string' })
  idlabel: string;

  // @ApiProperty({ example: '1', description: 'Attribute', type: 'string' })
  // attribute: string;
  
  @ApiProperty({ example: 'Name', description: 'The value of the label', type: 'string' })
  value: string;
  @ApiProperty({ example: '1222333', description: 'The date update on change', type: 'number' })
  updatedate: number;
}
