import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostSiteConfigDto implements Idto {
 

    @ApiProperty({ example: '1', description: 'identifier', type: 'string' })
    identifier: string;
    
    @ApiProperty({ example: '1', description: 'value', type: 'string' })
    value: string;
}
