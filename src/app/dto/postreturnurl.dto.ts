import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostReturnUrlDto implements Idto {
  
    @ApiProperty({ example: '1', description: 'url', type: 'string' })
    url: string;
  
}
