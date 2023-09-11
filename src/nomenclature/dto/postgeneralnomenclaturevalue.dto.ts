import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostGeneralNomenclatureValueDto implements Idto {
  
  @ApiProperty({
    example: '1',
    description: 'Unique ID from language table',
    type: 'string',
  })
  idlanguage: string;

  @ApiProperty({
    example: '1',
    description: 'Unique ID from type table',
    type: 'string',
  })
  idtype: string;

  @ApiProperty({
    example: 'test',
    description: 'The name value for the type for the specific language',
    type: 'string',
  })
  name: string;
  //....
}
