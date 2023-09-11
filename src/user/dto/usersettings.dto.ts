import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class UserSettingsDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: 'xxxx', description: 'Unique ID from user table', type: 'string' })
  iduser: string;

  @ApiProperty({ example: 'Petrov', description: 'The name of the user', type: 'string' })
  name: string;

  @ApiProperty({ example: 'John', description: 'The surname of the user', type: 'string' })
  surname: string;

  @ApiProperty({ example: '2002-03-04', description: 'The birthday of the user', type: Date })
  birthday: Date;

  @ApiProperty({ example: 'xxxx', description: 'Unique ID from type gender table', type: 'string' })
  idtypegender: string;
  //....

  @ApiProperty({ example: '1', description: 'Phones of the user', type: [String] })
  idsphone: string[];

  @ApiProperty({ example: 'xxxx', description: 'Unique ID from language table', type: 'string' })
  idlanguage: string;

  @ApiProperty({ example: '1', description: 'Unique ID gallery', type: 'string' })
  idavatar?: string;


  @ApiProperty({ example: 'xxxx', description: 'Unique ID from address table', type: 'string' })
  idphysicaladdress?: string;
  userroles: any;
  usersettings: any;
  typegender: any;
  avatar: any;
  physicaladdress: any;
  language: any;
  phones: any;
}
