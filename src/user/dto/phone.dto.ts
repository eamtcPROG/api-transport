import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PhoneDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: '069993321', description: 'The phone number', type: 'string' })
  phonenumber: string;

  @ApiProperty({ example: '+373', description: 'The phone number', type: 'string' })
  countrycode: string;

  @ApiProperty({ example: '1', description: 'The status of the phone number', type: 'number' })
  status: number;

  @ApiProperty({ example: '43244', description: 'The activation code of the phone number', type: 'string' })
  activationcode: string;

  @ApiProperty({ example: '1', description: 'Unique ID from TypePhone', type: 'string' })
  idtypephone: string;
  typephone: any;
  
  iduser: string;

  //....
}
