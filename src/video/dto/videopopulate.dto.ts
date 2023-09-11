import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import { LanguageDto } from 'src/language/dto/language.dto';
import { VideoDto } from './video.dto';


export class VideoPopulateDto implements Idto {
  @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
  id: string;

  @ApiProperty({ example: '1', description: 'language', type: LanguageDto })
  language: Idto;

  @ApiProperty({ example: '1', description: 'type object', type: VideoDto })
  typeobject: Idto;

  @ApiProperty({
    example: 'test',
    description: 'The name of the video',
    type: 'string',
  })
  name: string;
}
