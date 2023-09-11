import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {BlogDto} from './blog.dto';
import {BlogValueDto} from './blogvalue.dto';


export class LinkBlogDto implements Idto {
    
    @ApiProperty({
        example: 'Blog',
        description: 'The type object',
        type: BlogDto,
      })
      type: BlogDto;

      @ApiProperty({
        example: 'BlogValue',
        description: 'The value object',
        type: BlogValueDto,
      })
      value: BlogValueDto;
}
