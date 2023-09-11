import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class UpdateUserAdminDto implements Idto {
    

    @ApiProperty({
        example: 'testuseradmin@gmail.com',
        description: 'Email ',
        type: 'string',
    })
    email: string;

    
}
