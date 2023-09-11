import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PutLanguageDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: 'name xxxx', description: 'name', type: 'string' })
  name: string;

  @ApiProperty({ example: 'AU', description: 'Code of a country iso 2', type: 'string' })
  cod2: string;

  @ApiProperty({ example: 'AUS', description: 'Code of a country iso 3', type: 'string' })
  cod3: string;

  @ApiProperty({ example: '1', description: 'Status', type: 'number' })
  status: number;

  @ApiProperty({ example: '1', description: 'Order criteria', type: 'number' })
  ordercriteria: number;

  @ApiProperty({ example: '<p>HTML code<p>', description: 'Html code', type: 'string' })
  hmtlcode: string;

  @ApiProperty({ example: '1222333', description: 'The date update on change', type: 'number' })
  updatedate: number;
}
