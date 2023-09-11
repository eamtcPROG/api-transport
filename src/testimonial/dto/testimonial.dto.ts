import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class TestimonialDto implements Idto {
    @ApiProperty({ example: '1', description: 'Unique ID', type: 'string' })
    id: string;
    @ApiProperty({ example: '1', description: 'Unique ID user', type: 'string' })
    iduser: string;

    @ApiProperty({ example: '1', description: 'Unique ID teacher', type: 'string' })
    idteacher: string;

    @ApiProperty({ example: '1', description: 'Unique ID course', type: 'string' })
    idcourse: string;
    @ApiProperty({ example: '12321321321', description: 'Date', type: 'number' })
    date: number;
    @ApiProperty({ example: '5', description: 'Rating', type: 'number' })
    rating: number;
    @ApiProperty({ example: '1', description: 'Status', type: 'number' })
    status: number;
    @ApiProperty({ example: 'test', description: 'Message', type: 'string' })
    message: string;

    user?: any;
    teacher?: any;
    course?: any;
    user_email: any;
    usersettings: any;
    user_name: any;
    user_surname: any;
    teacher_email: any;
    teacher_fullname: string;



}
