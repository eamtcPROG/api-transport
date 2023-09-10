import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class SocialSignInDto implements Idto {
   
    
    @ApiProperty({
        example: '1',
        description: 'Social identifier of object',
        type: 'string',
    })
    socialidentifier: string;

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
    //....
}
