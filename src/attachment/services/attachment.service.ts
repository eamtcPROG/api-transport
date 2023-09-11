import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AttachmentRepository } from '../repositories/attachment.repository';
import { AttachmentDto } from '../dto/attachment.dto';
import { Attachment } from '../schemas/attachment.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultAttachmentDto } from '../dto/resultattachment.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';


import { AttachmentValueDto } from '../dto/attachmentvalue.dto';
import { AttachmentValueService } from './attachmentvalue.service';
import { LinkAttachmentDto } from '../dto/linkattachment.dto';
import { PostAttachmentDto } from '../dto/postattachment.dto';
import { AttachmentPopulateDto } from '../dto/attachmentpopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class AttachmentService
  extends GeneralService<AttachmentRepository, AttachmentValueService>
  implements IService
{
  constructor(
    private readonly attachmentRepository: AttachmentRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => AttachmentValueService))
    private readonly attachmentValueService: AttachmentValueService,
  ) {
    super(attachmentRepository, attachmentValueService);
  }

  getKeys(): any[] {
    const rez = [];
    
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new AttachmentDto();

    rez.id = this.attachmentRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idfile'))
      rez.idfile = this.attachmentRepository.getParsedIdStr(obj.idfile);
    if (obj.hasOwnProperty('isdefault')) rez.isdefault = obj.isdefault;
    if (obj.hasOwnProperty('ordercriteria')) rez.ordercriteria = obj.ordercriteria;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('idparent')) rez.idparent = obj.idparent;
    if (obj.hasOwnProperty('parent')) rez.parent = obj.parent;

    if (obj.hasOwnProperty('fileInfoObj')) rez.fileInfoObj = obj.fileInfoObj;

    if (obj.hasOwnProperty('allvalues')) rez.allvalues = obj.allvalues;
    if (obj.hasOwnProperty('_values'))
    {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('name')) rez.name = obj._values.name;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;
    }
    return rez;
  }

 convertFromBody(body: any, idfile:any): Idto {
   const obj: AttachmentDto = new AttachmentDto();

   if (body && 'id' in body) obj.id = body.id;
   if (idfile) {
     obj.idfile = idfile;
   } 
   else {
   if (body && 'idfile' in body) obj.idfile = body.idfile;
   }
   if (body && 'status' in body) obj.status = body.status;
   if (body && 'isdefault' in body) obj.isdefault = body.isdefault;
   if (body && 'ordercriteria' in body) obj.ordercriteria = body.ordercriteria;
   if (body && 'idparent' in body) obj.idparent = body.idparent;
   if (body && 'parent' in body) obj.parent = body.parent;

   if (body && 'idlanguage' in body) obj.idlanguage = body.idlanguage;
   if (body && 'name' in body) obj.name = body.name;
  
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: AttachmentDto = new AttachmentDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idfile') && postObj.idfile) obj.idfile = postObj.idfile;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('isdefault')) obj.isdefault = postObj.isdefault;
    if (postObj.hasOwnProperty('ordercriteria')) obj.ordercriteria = postObj.ordercriteria;
    if (postObj.hasOwnProperty('idparent')) obj.idparent = postObj.idparent;
    if (postObj.hasOwnProperty('parent')) obj.parent = postObj.parent;
    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new AttachmentDto();
  //   rez.id = obj._id;
  //   rez.status = obj.status;
  //   rez.idfile = obj.idfile;
  //   rez.isdefault = obj.isdefault;
  //   rez.ordercriteria = obj.ordercriteria;
  //   rez.idparent = obj.idparent;

  //   return rez;
  // }
  // // UNVERIFIED

  // prepareToAdd(obj: PostAttachmentDto): LinkAttachmentDto {
  //   const linkAttachmentDto = new LinkAttachmentDto();

  //   const objectType = new AttachmentDto();

  //   objectType.status = obj.status;
  //   objectType.idfile = obj.idfile;
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.isdefault = obj.isdefault;
  //   objectType.idparent = obj.idparent != undefined ? obj.idparent : '';

  //   linkAttachmentDto.type = objectType;

  //   const objectValue = new AttachmentValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   linkAttachmentDto.value = objectValue;
  //   return linkAttachmentDto;
  // }

  // fromPopulateToResult(obj: AttachmentPopulateDto): ResultAttachmentDto {
  //   const result: ResultAttachmentDto = new ResultAttachmentDto();

  //   result.language = obj.language.name;
  //   result.idlanguage = obj.language.id;
  //   result.name = obj.name;

  //   result.status = obj.typeobject.status;
  //   result.id = obj.id;
  //   result.idattachment = obj.typeobject.id;

  //   result.isdefault = obj.typeobject.isdefault;
  //   result.idfile = obj.typeobject.idfile;
  //   result.ordercriteria = obj.typeobject.ordercriteria;
  //   result.idparent = obj.typeobject.idparent;

  //   return result;
  // }

  // async addTypeWithValue(obj: PostAttachmentDto): Promise<ResultAttachmentDto> {
  //   const objects = this.prepareToAdd(obj);
  //   // const checkDuplicate = await this.attachmentValueService.getLanguageAndName(objects.value.idlanguage, objects.value.name);
  //   // if (checkDuplicate != null) return null;

  //   let typeObj;
  //   if (obj.idattachment == undefined || obj.idattachment == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idattachment, objects.type);
  //   }

  //   const valueObjToAdd: AttachmentValueDto = new AttachmentValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.name = objects.value.name;
  //   valueObjToAdd.idattachment = typeObj.id;

  //   const valueObj = await this.attachmentValueService.save(valueObjToAdd);

  //   const result = this.toTypeResult(typeObj, valueObj);
  //   const rez = await this.attachmentValueService.findByIdAndPopulate(
  //     result.id,
  //   );
  //   return rez;
  // }

  // toTypeResult(
  //   tObj: AttachmentDto,
  //   vObj: AttachmentValueDto,
  // ): ResultAttachmentDto {
  //   const result: ResultAttachmentDto = new ResultAttachmentDto();

  //   result.idlanguage = vObj.idlanguage;
  //   result.name = vObj.name;

  //   result.status = tObj.status;
  //   result.id = vObj.id;
  //   result.idattachment = tObj.id;
  //   result.isdefault = tObj.isdefault;
  //   result.idfile = tObj.idfile;
  //   result.ordercriteria = tObj.ordercriteria;
  //   result.idparent = tObj.idparent;

  //   return result;
  // }

  // async add(postObj: object): Promise<AttachmentDto> {
  //   const obj = await this.attachmentRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj = await this.attachmentValueService.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idattachment;
  //   const obj = await this.attachmentRepository.delete(id);
  //   await this.attachmentValueService.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<AttachmentDto> {
  //   const obj = await this.attachmentRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // prepareToUpdate(obj: ResultAttachmentDto): LinkAttachmentDto {
  //   const attachmentDto = new LinkAttachmentDto();

  //   const objectType = new AttachmentDto();

  //   objectType.status = obj.status;
  //   objectType.idfile = obj.idfile;

  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.isdefault = obj.isdefault;
  //   objectType.idparent = obj.idparent != undefined ? obj.idparent : '';

  //   attachmentDto.type = objectType;

  //   const objectValue = new AttachmentValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;
  //   objectValue.idattachment = obj.idattachment;

  //   attachmentDto.value = objectValue;

  //   return attachmentDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultAttachmentDto,
  // ): Promise<ResultAttachmentDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.attachmentValueService.save(objects.value, id);

  //   const objT = await this.update(obj.idattachment, objects.type);

  //   if (objV == null || objT == null) return null;
  //   // const result = this.toTypeResult(objT, objV);
  //   const rez = await this.attachmentValueService.findByIdAndPopulate(id);
  //   return rez;
  // }
}