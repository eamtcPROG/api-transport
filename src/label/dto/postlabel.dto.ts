import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostLabelDto implements Idto {
  
  @ApiProperty({ example: 'name xxxx', description: 'Identifier', type: 'string' })
  identifier: string;

  @ApiProperty({ example: '1', description: 'Type', type: 'number' })
  type: number;
  
  @ApiProperty({ example: '1', description: 'Status', type: 'number' })
  status: number;

  // @ApiProperty({ example: '1', description: 'Attribute', type: 'number' })
  // attribute: string;
  
  @ApiProperty({ example: 'Name', description: 'The value of the label', type: 'string' })
  value: string;
  
  // @ApiProperty({ example: 'Name', description: 'The value of the label', type: 'string' })
  // title: string;


  @ApiProperty({ example: '1', description: 'Unique ID from language table', type: 'string' })
  idlanguage: string;

  @ApiProperty({ example: '1', description: 'Unique ID from LabelValue table', type: 'string' })
  idlabelvalue?:string;
}
