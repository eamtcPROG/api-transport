import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostUrlRelationDto implements Idto {
  
    @ApiProperty({ example: '1', description: 'url', type: 'string' })
    url: string;
  
    @ApiProperty({ example: '1', description: 'identifier', type: 'string' })
    identifier: string;
    
    @ApiProperty({ example: '1', description: 'idobject', type: 'string' })
    idobject: string;
}
