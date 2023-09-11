import { ApiProperty } from '@nestjs/swagger';
import Idto from 'src/app/interfaces/idto.interface';
import {PermissionDto} from 'src/user/dto/permission.dto'
import {RoleDto} from 'src/user/dto/role.dto'
export class PermissionWithRoleDto implements Idto {
    
    @ApiProperty({ example: 'permission obj', description: 'Permission', type: PermissionDto })
    permission: PermissionDto;

    @ApiProperty({ example: 'role objs', description: 'Role', type: Array<RoleDto> })
    roles: RoleDto[];

    
}


export class PermissionsWithRoleDto implements Idto {
    
    @ApiProperty({ example: 'permission obj', description: 'Permission', type: Array<PermissionDto> })
    permission: PermissionDto[];

    @ApiProperty({ example: 'role objs', description: 'Role', type: Array<RoleDto> })
    roles: RoleDto[];

    
}