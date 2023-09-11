import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { PostGeneralNomenclatureValueDto } from './postgeneralnomenclaturevalue.dto';
import GeneralNomenclatureDto from './generalnomenclature.dto';

export class NomenclatureDto implements Idto {
    
    @ApiProperty({
        example: 'TypeTest',
        description: 'The type object',
        type: GeneralNomenclatureDto,
      })
      type: GeneralNomenclatureDto;

      @ApiProperty({
        example: 'ValueTest',
        description: 'The value object',
        type: PostGeneralNomenclatureValueDto,
      })
      value: PostGeneralNomenclatureValueDto;
  allvalues: any;
}
