import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import GeneralNomenclatureValueDto from './generalnomenclaturevalue.dto';

export default class GeneralNomenclatureDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'Status', type: 'number' })
    status: number;

    @ApiProperty({ example: '1', description: 'Order criteria', type: 'number' })
    ordercriteria: number;

    @ApiProperty({ example: 'typeobjectvalue', description: 'The values of the object', type: GeneralNomenclatureValueDto })
    objectvalues?: GeneralNomenclatureValueDto[];
  allvalues: any;
  idlanguage: any;
  name: any;
  language: any;

  attachment?: any;
  video?: any;
  gallery?: any;
    //....
}
