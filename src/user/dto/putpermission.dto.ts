import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PutPermissionDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: 'name xxxx', description: 'name', type: 'string' })
    name: string;

    @ApiProperty(
        {
            example: 'text xxx',
            description: 'Description field about permission',
            type: 'string'
        }
    )
    description: string;

    @ApiProperty(
        {
            example: 'text xxx',
            description: 'Array with Unique ID from table Roles',
            type: [String]
        }
    )
    acceptedroles: string[];
    //....
}
