import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class ParsedVideoDto implements Idto {
    videolocation?: string;
    videoserver?: string;
    videoid?: string;
}
