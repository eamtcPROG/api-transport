

import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class RegisterUserFirstStepDto implements Idto {
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

  @ApiProperty({ example: 'Petrov', description: 'The name of the user', type: 'string' })
  name: string;

  @ApiProperty({ example: 'John', description: 'The surname of the user', type: 'string' })
  surname: string;

  @ApiProperty({ example: '2002-03-04', description: 'The birthday of the user', type: Date })
  birthday: Date;


  @ApiProperty({ example: '069993321', description: 'The phone number', type: 'string' })
  phonenumber: string;

  @ApiProperty({ example: '+373', description: 'The phone number', type: 'string' })
  countrycode: string;

  @ApiProperty({ example: '1', description: 'Unique ID from TypePhone', type: 'string' })
  idtypephone: string;

  @ApiProperty({ example: '1', description: 'Unique ID from Langauge', type: 'string' })
  idlanguage: string;

  notificationtype1: boolean;
}
