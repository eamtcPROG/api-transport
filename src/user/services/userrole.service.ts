import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRoleRepository } from '../repositories/userrole.repository';
// import { UserRoleDto } from '../dto/userrole.dto';
import { UserRole } from '../schemas/userrole.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
// import { PostUserRoleDto } from 'src/user/dto/postuserrole.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';

import RequestFilterDTO from 'src/app/dto/requestfilter.dto';

import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class UserRoleService
  extends GeneralService<UserRoleRepository, null>
  implements IService {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    protected readonly configService: ConfigService,
  ) {
    super(userRoleRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['iduser', 'idrole']);
    return rez;
  }

  toDto(obj: any): Idto {
    // const rez = new UserRoleDto();
let rez:any;
    rez.id = this.userRoleRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('iduser')) rez.iduser = this.userRoleRepository.getParsedIdStr(obj.iduser);
    if (obj.hasOwnProperty('idrole')) rez.idrole = this.userRoleRepository.getParsedIdStr(obj.idrole);

    if (obj.hasOwnProperty('roleobj')) {
      rez.roleobj = obj.roleobj;
      if (obj.roleobj.hasOwnProperty('name')) rez.name = obj.roleobj.name;
    }


    return rez;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    // const obj: UserRoleDto = new UserRoleDto();
    let obj;

    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('iduser')) obj.iduser = postObj.iduser;
    if (postObj.hasOwnProperty('idrole')) obj.idrole = postObj.idrole;
    return obj;
  }

  // UNVERIFIED TEMPORARILY

  async setDefaultRole(id: string): Promise<any> {
    // const postObj: PostUserRoleDto = new PostUserRoleDto();
    let postObj;
    postObj.idrole = this.configService.get('user.roles.default_sign_up_role');
    postObj.iduser = id;
    const obj = await this.save(postObj);
    if (obj == null) return null;
    return obj;
    // return null;
  }

  async setTeacherRole(id: string): Promise<any> {
    let postObj;
    // const postObj: PostUserRoleDto = new PostUserRoleDto();
    postObj.idrole = this.configService.get('user.roles.default_teacher');
    postObj.iduser = id;
    const obj = await this.save(postObj);
    if (obj == null) return null;
    return obj;
    // return null;
  }

  async getUserRoles(id: string): Promise<string[]> {
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 50;
    rLDTO.filters = [];

    const tf = new RequestFilterDTO();
    tf.field = 'iduser';
    tf.values = [id];

    rLDTO.filters.push(tf);

    // const objects = await this.getAll(rLDTO) as UserRoleDto[];
    const objects = await this.getAll(rLDTO) as any[];
    if (objects == null) return null;
    const roles = objects.map((item) => item.idrole);
    return roles;
  }

  async deleteUserRoleByIdUser(id: string, idRole?: string): Promise<any> {
    if (!idRole) idRole = this.configService.get('user.roles.default_teacher');
    
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 1;
    rLDTO.filters = [];

    const tf = new RequestFilterDTO();
    tf.field = 'iduser';
    tf.values = [id];
    rLDTO.filters.push(tf);

    const tf2 = new RequestFilterDTO();
    tf2.field = 'idrole';
    tf2.values = [idRole];
    rLDTO.filters.push(tf2);

    const objects = await this.getAll(rLDTO) as UserRole[];
    if (objects.length != 0) {
      if (objects[0].hasOwnProperty('id')) await this.delete(objects[0].id);
    }
  }
}
