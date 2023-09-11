import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PermissionRepository } from '../repositories/permission.repository';
import { PermissionDto } from 'src/user/dto/permission.dto';
import { Permission } from '../schemas/permission.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostPermissionDto } from 'src/user/dto/postpermission.dto';
import { PermissionWithRoleDto ,PermissionsWithRoleDto} from 'src/user/dto/permissionwithrole.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import { PutPermissionDto } from 'src/user/dto/putpermission.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { ToolsDate } from 'src/app/tools/tooldate';
import * as crypto from 'crypto';
import { RoleService } from './role.service';
import { RoleDto } from 'src/user/dto/role.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import RequestSortCriteriaDTO from 'src/app/dto/requestsortcriteria.dto';

@Injectable()
export class PermissionService
  extends GeneralService<PermissionRepository, null>
  implements IService
{
  constructor(
    private readonly permissionRepository: PermissionRepository,
    protected readonly configService: ConfigService,
    private readonly roleService: RoleService,
  ) {
    super(permissionRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['name']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new PermissionDto();
    // let rez
    rez.id = this.permissionRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('description')) rez.description = obj.description;
    if (obj.hasOwnProperty('acceptedroles')) rez.acceptedroles = obj.acceptedroles;
    if (obj.hasOwnProperty('updatedate')) rez.updatedate = obj.updatedate;

    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: PermissionDto = new PermissionDto();
    // let obj
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('description')) obj.description = postObj.description;
    if (postObj.hasOwnProperty('acceptedroles')) obj.acceptedroles = postObj.acceptedroles;
    obj.updatedate = ToolsDate.getTimeStamp();
    return obj;
  }

  async getHash(): Promise<object> {
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 1;
    rLDTO.filters = [];

    const sort: RequestSortCriteriaDTO = new RequestSortCriteriaDTO();
    sort.field = 'updatedate';
    sort.asc = false;

    rLDTO.sortcriteria = [];
    rLDTO.sortcriteria.push(sort);

    const total = await this.permissionRepository.findCount(rLDTO);
    const all = await this.permissionRepository.findAll(rLDTO);

    let lastId = '';
    let lastUpdateDate = -1;

    if (all.length) {
      const obj = all[0];
      lastId = obj.id;
      lastUpdateDate = obj.updatedate;
    }

    const hash = crypto
      .createHash('md5')
      .update(`${total}_${lastId}_${lastUpdateDate}`)
      .digest('hex');

    return { hash: hash };
  }

  async getPermissionByName(name: string): Promise<PermissionDto> {
    const obj = await this.getByField('name', name) as PermissionDto;
    if(obj == null) return null;
    return obj;
  }

  // async getPermissionByName(name: string): Promise<any> {
  //   const obj = await this.getByField('name', name) as any;
  //   if(obj == null) return null;
  //   return obj;
  // }
}
