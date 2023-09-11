import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilePermissionRepository } from '../repositories/filepermission.repository';
import { FilePermissionDto } from '../dto/filepermission.dto';
import { FilePermission } from '../schemas/filepermission.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostFilePermissionDto } from '../dto/postfilepermission.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class FilePermissionService
  extends GeneralService<FilePermissionRepository, null>
  implements IService {
  constructor(
    private readonly filePermissionRepository: FilePermissionRepository,
    protected readonly configService: ConfigService,
  ) {
    super(filePermissionRepository);
  }
  
  getKeys(): any[] {
    const rez = [];
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new FilePermissionDto();
    rez.id = this.filePermissionRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('criteria')) rez.criteria = obj.criteria;
    if (obj.hasOwnProperty('value')) rez.value = obj.value;

    return rez;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    const obj: FilePermissionDto = new FilePermissionDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('value')) obj.value = postObj.value;
    if (postObj.hasOwnProperty('criteria')) obj.criteria = postObj.criteria;

    return obj;
  }

  // UNVERIFIED

  // async add(postObj: PostFilePermissionDto): Promise<Idto> {
  //   const obj = await this.filePermissionRepository.save(postObj);

  //   return this.toDto(obj);
  // }


  // async update(id: string, putObj: PostFilePermissionDto): Promise<Idto> {
  //   const obj = await this.filePermissionRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }
}