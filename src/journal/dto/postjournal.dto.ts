import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostJournalDto implements Idto {
   
    @ApiProperty({ example: '1', description: 'Date', type: 'number' })
    date: number;

    @ApiProperty({ example: '1', description: 'Type', type: 'number' })
    type: number;

    @ApiProperty({ example: '1', description: 'Unique ID of the user', type: 'string' })
    iduser: string;

    @ApiProperty({ example: '1', description: 'Info', type: 'string' })
    info: string;

}
