import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MessageDto } from 'src/app/dto/message.dto';
import { ApiProperty } from '@nestjs/swagger';
// import { UserDto } from 'src/user/dto/user.dto';
import { AccessTokenDto } from './accesstoken.dto';
// import { UserRoleDto } from 'src/user/dto/userrole.dto';
// import { UserSettingsDto } from 'src/user/dto/usersettings.dto';

@Injectable()
export default class ResultSignInDTO {
  @ApiProperty({
    example: true,
    description: 'Exist or no Error',
    type: 'boolean',
  })
  err: boolean;

  @ApiProperty({
    example: true,
    description: 'Must or no to change password',
    type: 'boolean',
  })
  mustchangepassword: boolean;

  @ApiProperty({
    description: 'Access token',
    type: AccessTokenDto,
  })
  accesstoken: AccessTokenDto;

  @ApiProperty({
    description: 'Message List',
    type: MessageDto,
    isArray: true,
  })
  messages?: MessageDto[];

  // @ApiProperty({
  //   description: 'Specific Object DTO',
  //   type: UserDto,
  // })
  // obj?: UserDto;

  // @ApiProperty({
  //   description: 'Specific Object DTO',
  //   type: UserDto,
  // })
  obj?: any;

  @ApiProperty({
    description: 'Specific Object DTO',
    type: [],
  })
  roles?: string[];

  // @ApiProperty({
  //   description: 'User Settings Object DTO',
  //   type: UserSettingsDto,
  // })
  // usersettings?: UserSettingsDto;
  usersettings?: any;
}
