import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RoleRepository } from '../repositories/role.repository';
import { RoleDto } from 'src/user/dto/role.dto';
import { Role } from '../schemas/role.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostRoleDto } from 'src/user/dto/postrole.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import { PutRoleDto } from 'src/user/dto/putrole.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class RoleService
  extends GeneralService<RoleRepository, null>
  implements IService
{
  constructor(
    private readonly roleRepository: RoleRepository,
    protected readonly configService: ConfigService,
  ) {
    super(roleRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['name']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new RoleDto();
    // let rez

    rez.id = this.roleRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('fixed')) rez.fixed = obj.fixed;
    
    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: RoleDto = new RoleDto();
    // let obj
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('fixed')) obj.fixed = postObj.fixed;
    
    return obj;
  }
}
