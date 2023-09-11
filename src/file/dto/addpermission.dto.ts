import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class AddPermissionDto implements Idto {
  
  @ApiProperty({ example: '[xxxx]', description: 'Permission to add', type: ['string'], isArray: true })
  permission: string[];

  
  //....
}
