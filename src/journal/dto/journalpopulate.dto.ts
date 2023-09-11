import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class JournalPopulateDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;
  
    @ApiProperty({ example: '1', description: 'Date', type: 'number' })
    date: number;

    @ApiProperty({ example: '1', description: 'Type', type: 'number' })
    type: number;

    @ApiProperty({ example: '1', description: 'User', type: Object })
    user: {
        id:string;
        email:string;
    };

    @ApiProperty({ example: '1', description: 'Info', type: 'string' })
    info: string;

}
