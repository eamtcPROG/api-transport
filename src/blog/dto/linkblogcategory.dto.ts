import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {BlogCategoryDto} from './blogcategory.dto';
import {BlogCategoryValueDto} from './blogcategoryvalue.dto';


export class LinkBlogCategoryDto implements Idto {
    
    @ApiProperty({
        example: 'BlogCategory',
        description: 'The type object',
        type: BlogCategoryDto,
      })
      type: BlogCategoryDto;

      @ApiProperty({
        example: 'BlogCategoryValue',
        description: 'The value object',
        type: BlogCategoryValueDto,
      })
      value: BlogCategoryValueDto;
}
