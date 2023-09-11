import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class MenuDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: '1', description: 'Status of menu', type: 'number' })
  status: number;

  @ApiProperty({
    example: '1',
    description: 'The position of the menu in site',
    type: 'number',
  })
  section: number;

  @ApiProperty({
    example: '1',
    description: 'The order of menu',
    type: 'number',
  })
  ordercriteria: number;

  @ApiProperty({ example: 'false', description: 'Has url', type: 'boolean' })
  hasurl: boolean;

  @ApiProperty({
    example: 'http://test',
    description: 'The url of an external site',
    type: 'string',
  })
  url: string;

  @ApiProperty({
    example: '1',
    description: 'Unique ID of the page where to go',
    type: 'string',
  })
  idpage: string;

  @ApiProperty({
    example: '1',
    description: 'Unique ID of the parent',
    type: 'string',
  })
  idparent: string;
  allvalues: any;

  @ApiProperty({
    example: '1',
    description: 'Unique ID from language table',
    type: 'string',
  })
  idlanguage?: string;

  @ApiProperty({
    example: 'test',
    description: 'The name of the menu',
    type: 'string',
  })
  name?: string;
  attachment?: any;
  gallery?: any;
  video?: any;
  language?: any;
  page?: any;
  fullurl?: any;
  haschildren?: boolean;
}
