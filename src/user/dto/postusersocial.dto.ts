import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostUserSocialDto implements Idto {
   
    @ApiProperty({
        example: '1',
        description: 'User ID of object',
        type: 'string',
    })
    iduser: string;

    @ApiProperty({
        example: '1',
        description: 'Social identifier of object',
        type: 'number',
    })
    socialidentifier: number;

    @ApiProperty({
        example: '1',
        description: 'Social ID',
        type: 'string',
    })
    socialid: string;

    @ApiProperty({
        example: '1',
        description: 'User`s social identifier',
        type: 'string',
    })
    socialuseridentifier: string;

}
