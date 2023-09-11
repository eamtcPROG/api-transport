import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {VideoDto} from './video.dto';
import {VideoValueDto} from './videovalue.dto';


export class LinkVideoDto implements Idto {
    
    @ApiProperty({
        example: 'Video',
        description: 'The type object',
        type: VideoDto,
      })
      type: VideoDto;

      @ApiProperty({
        example: 'VideoValue',
        description: 'The value object',
        type: VideoValueDto,
      })
      value: VideoValueDto;
}
