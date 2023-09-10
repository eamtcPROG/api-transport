import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';

// import { PostPermissionDto } from 'src/user/dto/postpermission.dto';

// import { JwtPayload } from 'src/auth/dto/jwtpayload.dto';
// import { PermissionDto } from 'src/user/dto/permission.dto';

// import { AuthService } from 'src/auth/services/auth.service';
import { CommonTools } from 'src/app/tools/commontools';
// import { PermissionService } from 'src/user/services/permission.service';
// import { ConfigService } from '@nestjs/config';
// import { ToolsDate } from '../tools/tooldate';

@Injectable()
export class GeneralAdminGuard implements CanActivate {
    constructor(
        private commonTools: CommonTools,
        // private permissionService: PermissionService,
        // private authService: AuthService,
        // private configService: ConfigService,
    ) { }

    // private getPayLoad(context: ExecutionContext): JwtPayload | null {
        private getPayLoad(context: ExecutionContext):  null {
        const request = context.switchToHttp().getRequest();

        const headers = request.headers;
        const authorization = headers.authorization;

        if (authorization == undefined) return null;
        if (!authorization) return null;

        const t = authorization.split(' ');
        if (t.length != 2) return null;

        const token = t[1];

        // const parsedToken = this.authService.parseToken(token);
        // const payload: JwtPayload = {
        //     id: parsedToken.id,
        //     email: parsedToken.email,
        //     rolesid: parsedToken.rolesid,
        //     usersettings: parsedToken.usersettings,
        // }

        return null;
    }

    private getController(context: ExecutionContext): string | null {
        const constructorRef = context['constructorRef'];

        if (constructorRef == undefined) return '_undefined_';
        if (!constructorRef) return '_undefined_';

        let rez = this.commonTools.functionName(constructorRef, '_undefined_');

        rez = rez.replace('Controller', '');

        return rez;
    }

    private getFunction(context: ExecutionContext): string | null {
        const constructorRef = context['handler'];

        if (constructorRef == undefined) return '_undefined_';
        if (!constructorRef) return '_undefined_';

        const rez = this.commonTools.functionName(constructorRef, '_undefined_');

        return rez;
    }

    private getPermissionKey(context: ExecutionContext): string {
        
        const request = context.switchToHttp().getRequest();
        
        const rez: string = request.method + '-' + this.getController(context) + '-' + this.getFunction(context);

        return rez;
    }

    // private async getPermissionObj(context: ExecutionContext): Promise<PermissionDto> {
        
    //     const _permisionkey: string = this.getPermissionKey(context);
        
    
    //     let needPermission: PermissionDto = await this.permissionService.getPermissionByName(_permisionkey.toLowerCase());
    //     if(needPermission == null){
    //         needPermission = await this.permissionService.getPermissionByName(_permisionkey.toLowerCase());
    //     }

    //     if (needPermission == null) {
    //         // nu exista; se adauga
    //         const newPermission = new PostPermissionDto();
    //         newPermission.name = _permisionkey;
    //         newPermission.description = _permisionkey;
    //         newPermission.acceptedroles = null;
            
    //         needPermission = await this.permissionService.save(newPermission) as PermissionDto;
            
    //     }

    //     return needPermission;
    // }

    // private getNeedRoles(needPermission: PermissionDto): string[] {
    //     const rez: string[] = [];

    //     if (needPermission == undefined) return rez;
    //     if (needPermission == null) return rez;
    //     if (!needPermission) return rez;

    //     const roles: string[] = needPermission.acceptedroles;

    //     if (roles == undefined) return rez;
    //     if (roles == null) return rez;
    //     if (!roles) return rez;
    //     if (!Array.isArray(roles)) return rez;

    //     for (const i of roles) {
    //         rez[rez.length] = roles[i];
    //     }

    //     return rez;
    // }

    // private getExistRoles(context: ExecutionContext): string[] {
    //     const rez: string[] = [];

    //     const payload: JwtPayload = this.getPayLoad(context);

    //     if (payload == null) return rez;
    //     if (payload == undefined) return rez;
    //     if (!payload) return rez;

    //     if (typeof payload != 'object') return rez;

    //     const roles = payload.rolesid;

    //     if (roles == null) return rez;
    //     if (roles == undefined) return rez;
    //     if (!roles) return rez;
    //     if (!Array.isArray(roles)) return rez;

    //     for (const i of roles) {
    //         rez[rez.length] = roles[i];
    //     }

    //     return rez;
    // }

    // private isAdmin(roles: string[]): boolean {
    //     const superadmins: string[] = [];
    //     superadmins.push(this.configService.get('user.roles.default_admin'));
    //     const results = this.commonTools.arrayIntersect(roles, superadmins);
    //     if (results.length) return true;
    //     return false;
    // }

    async canActivate(context: ExecutionContext): Promise<boolean> {


        // const existRoles: string[] = this.getExistRoles(context);
        // if (this.isAdmin(existRoles)) return true;
        
        // const permissionObj: PermissionDto = await this.getPermissionObj(context);

        // const needRoles: string[] = this.getNeedRoles(permissionObj);
        // if (!needRoles.length) return true;

        // const results = this.commonTools.arrayIntersect(needRoles, existRoles);
        // if (results.length) return true;

        return false;
    }
}
