import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {AttachmentDto} from './attachment.dto';
import {AttachmentValueDto} from './attachmentvalue.dto';


export class LinkAttachmentDto implements Idto {
    
    @ApiProperty({
        example: 'Attachment',
        description: 'The type object',
        type: AttachmentDto,
      })
      type: AttachmentDto;

      @ApiProperty({
        example: 'AttachmentValue',
        description: 'The value object',
        type: AttachmentValueDto,
      })
      value: AttachmentValueDto;
}
