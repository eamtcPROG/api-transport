import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ResetPasswordCodeDto implements Idto {
  @ApiProperty({
    example: 'examplde@example.com',
    description: 'User email - unique in system',
    type: 'string',
  })
  email: string;
  
}
