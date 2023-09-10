import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class SiteConfigDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;

    @ApiProperty({ example: '1', description: 'identifier', type: 'string' })
    identifier: string;
    
    @ApiProperty({ example: '1', description: 'value', type: 'string' })
    value: string;

    updatedate: number;
}
