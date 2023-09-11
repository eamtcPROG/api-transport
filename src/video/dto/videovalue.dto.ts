import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class VideoValueDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({
    example: '1',
    description: 'Unique ID from language table',
    type: 'string',
  })
  idlanguage: string;

  @ApiProperty({
    example: '1',
    description: 'Unique ID from video table',
    type: 'string',
  })
  idvideo: string;

  @ApiProperty({
    example: 'test',
    description: 'The name of the video',
    type: 'string',
  })
  name: string;
  language: any;
}
