import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { UserRoleDto } from './userrole.dto';

export class UserDto implements Idto {
  @ApiProperty({
    example: 'randomidxxx',
    description: 'Unique ID',
    type: 'string',
  })
  id?: string;

  @ApiProperty({
    example: '1',
    description: 'Status ID of object',
    type: 'number',
  })
  status: number;

  @ApiProperty({
    example: 1683385200,
    description: 'Register TimeStamp',
    type: 'number',
  })
  registerdate: number;

  @ApiProperty({
    example: 'examplde@example.com',
    description: 'User email - unique in system',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    example: '1',
    description: 'Status ID of email',
    type: 'number',
  })
  statusemail: number;

  @ApiProperty({
    example: '*****',
    description: 'User password (Hashed)',
    type: 'string',
  })
  password: string;

  @ApiProperty({
    example: '1',
    description: 'Status ID of password (active / temporary / old / ...)',
    type: 'number',
  })
  statuspassword: number;

  @ApiProperty({
    example: '*****',
    description: 'Hash to use for validation (email, etc)',
    type: 'string',
  })
  hash: string;

  @ApiProperty({
    description: 'List of user roles',
    type: 'array',
  })
  userroles?: UserRoleDto[];
  usersettings?: any;
  usersocial?: any;
  name?: any;
  surname?: any;
  birthday?: any;
  idusersettings?: any;
  phones?: any;
}
