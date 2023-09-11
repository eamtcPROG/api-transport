import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ModifyPasswordDto implements Idto {
    @ApiProperty({
        example: 'examplde@example.com',
        description: 'User email - unique in system',
        type: 'string',
    })
    email: string;

    @ApiProperty({
        example: '*****',
        description: 'User current password ',
        type: 'string',
    })
    currentpassword: string;

    @ApiProperty({
        example: '*****',
        description: 'New password',
        type: 'string',
    })
    newpassword: string;
}
