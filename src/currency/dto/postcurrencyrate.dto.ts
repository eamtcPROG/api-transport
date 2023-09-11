import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class PostCurrencyRateDto implements Idto {
    

    @ApiProperty({ example: '2023-10-06', description: 'The date', type: Date })
    date: Date;

    @ApiProperty({
        example: '1',
        description: 'From Unique ID from currency table',
        type: 'string',
    })
    fromidcurrency: string;

    @ApiProperty({
        example: '1',
        description: 'To Unique ID from currency table',
        type: 'string',
    })
    toidcurrency: string;
    
    @ApiProperty({ example: '1', description: 'The rate of the exchange', type: 'number' })
    rate: number;

    
  
}
