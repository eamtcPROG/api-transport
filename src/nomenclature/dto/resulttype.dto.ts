import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ResultTypeDto implements Idto {
  @ApiProperty({ example: '12312312321', description: 'Unique id of type', type: 'string' })
  id: string;

  @ApiProperty({ example: '12312312321', description: 'Unique id of type value', type: 'string' })
  idvalue: string;
  @ApiProperty({ example: 'name xxxx', description: 'name', type: 'string' })
  name: string;

  @ApiProperty({ example: '1', description: 'Status', type: 'number' })
  status: number;

  @ApiProperty({ example: '1', description: 'Order criteria', type: 'number' })
  ordercriteria: number;

  @ApiProperty({
    example: '1',
    description: 'Unique ID from language table',
    type: 'string',
  })
  idlanguage: string;
  //....
}
