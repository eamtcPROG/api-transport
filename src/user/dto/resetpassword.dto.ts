import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ResetPasswordDto implements Idto {
  @ApiProperty({
    example: 'examplde@example.com',
    description: 'User email - unique in system',
    type: 'string',
  })
  email: string;
  
  @ApiProperty({
    example: '*****',
    description: 'User password (Hashed)',
    type: 'string',
  })
  password: string;

  @ApiProperty({
    example: '*****',
    description: 'Code for checking integrity',
    type: 'string',
  })
  code: string;
}
