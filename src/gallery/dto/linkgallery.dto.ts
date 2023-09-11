import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {GalleryDto} from './gallery.dto';
import {GalleryValueDto} from './galleryvalue.dto';


export class LinkGalleryDto implements Idto {
    
    @ApiProperty({
        example: 'Gallery',
        description: 'The type object',
        type: GalleryDto,
      })
      type: GalleryDto;

      @ApiProperty({
        example: 'GalleryValue',
        description: 'The value object',
        type: GalleryValueDto,
      })
      value: GalleryValueDto;
}
