import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class CreateUserAdminDto implements Idto {
    

    @ApiProperty({
        example: 'testuseradmin@gmail.com',
        description: 'Email ',
        type: 'string',
    })
    email: string;

    @ApiProperty({
        example: '******',
        description: 'password ',
        type: 'string',
    })
    password: string;
}
