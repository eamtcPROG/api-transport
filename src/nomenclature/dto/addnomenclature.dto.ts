import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class AddNomenclatureDto implements Idto {
    
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

    @ApiProperty({
        example: 'test',
        description: 'The name value for the type for the specific language',
        type: 'string',
      })
      name: string;


      @ApiProperty({
        example: '1',
        description: 'Unique ID',
        type: 'string',
      })
      idtype: string;
}
