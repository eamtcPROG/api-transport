import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ModifyPasswordAdminDto implements Idto {
    

    @ApiProperty({
        example: '*****',
        description: 'User new password ',
        type: 'string',
    })
    password: string;

    
}
