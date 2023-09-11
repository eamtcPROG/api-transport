import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ResetCodeDto implements Idto {
  @ApiProperty({
    example: '3435322',
    description: 'User code for reseting password',
    type: 'string',
  })
  code: string;
  
}
