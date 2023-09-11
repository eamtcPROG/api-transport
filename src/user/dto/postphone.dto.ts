import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostPhoneDto implements Idto {
  
  @ApiProperty({ example: '069993321', description: 'The phone number', type: 'string' })
  phonenumber: string;

  @ApiProperty({ example: '+373', description: 'The phone number', type: 'string' })
  countrycode: string;

  @ApiProperty({ example: '1', description: 'The status of the phone number', type: 'number' })
  status: number;

  @ApiProperty({ example: '1', description: 'Unique ID from TypePhone', type: 'string' })
  idtypephone: string;


  @ApiProperty({ example: '1', description: 'Unique ID from usersettings', type: 'string' })
  idusersettings?: string;
  //....
}
