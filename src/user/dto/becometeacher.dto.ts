

import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';

export class BecomeTeacherDto implements Idto {
    @ApiProperty({ example: 'xxxx', description: 'Unique ID from user table', type: 'string' })
    iduser: string;

    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type specialty table', type: 'string' })
    idtypespecialty: string;

    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type table', type: 'string' })
    idtypetargetgroup: string;
    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type table', type: 'string' })
    idtypeinternetconnection: string;
    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type table', type: 'string' })
    idtypehardware: string;
    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type table', type: 'string' })
    idtypelesson: string;
    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type table', type: 'string' })
    idtypediscipline: string;
    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type table', type: 'string' })
    idtypeoccupation: string;
    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type table', type: 'string' })
    idtypestudies: string;
    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type table', type: 'string' })
    idtypeprofessionalismlevel: string;
    @ApiProperty({ example: 'xxxx', description: 'Unique ID from type table', type: 'string' })
    idtypeexperience: string;
    //....
    @ApiProperty({ example: 'test', description: 'The description about teacher', type: 'string' })
    bio: string;
    @ApiProperty({ example: '1', description: 'The time teacher wants to teach per week', type: 'string' })
    timetoteachperweek: string;
    @ApiProperty({ example: 'true', description: 'Teacher has audience?', type: 'boolean' })
    hasaudience: boolean;
    @ApiProperty({ example: 'test', description: 'The institution where the teacher graduated', type: 'string' })
    graduatedinstitution: string;
    @ApiProperty({ example: 'test', description: 'Why do you chose to teach on liveclass', type: 'string' })
    whyliveclass: string;

    @ApiProperty({ example: '1', description: 'Teacher status', type: 'number' })
    status: number;

    @ApiProperty({ example: 'false', description: 'Notification', type: 'boolean' })
    notificationtype1: boolean;

    @ApiProperty({ example: 'false', description: 'Notification', type: 'boolean' })
    notificationtype2: boolean;

    @ApiProperty({ example: 'false', description: 'Notification', type: 'boolean' })
    notificationtype3: boolean;
}
