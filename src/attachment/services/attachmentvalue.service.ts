import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AttachmentValueRepository } from '../repositories/attachmentvalue.repository';
import { AttachmentValueDto } from '../dto/attachmentvalue.dto';
import { AttachmentPopulateDto } from '../dto/attachmentpopulate.dto';

import { AttachmentValue } from '../schemas/attachmentvalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';

import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { AttachmentService } from './attachment.service';
import { ResultAttachmentDto } from '../dto/resultattachment.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class AttachmentValueService
  extends GeneralService<AttachmentValueRepository, null>
  implements IService
{
  constructor(
    private readonly attachmentValueRepository: AttachmentValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => AttachmentService))
    private readonly attachmentService: AttachmentService,
  ) {
    super(attachmentValueRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idattachment']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new AttachmentValueDto();

    rez.id = this.attachmentValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idattachment') && obj.idattachment)
      rez.idattachment = this.attachmentValueRepository.getParsedIdStr(obj.idattachment);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.attachmentValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;

    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto{
    if (!postObj.idlanguage) return null;

    const obj: AttachmentValueDto = new AttachmentValueDto();
    if (postObj.idlanguage) obj.idlanguage = postObj.idlanguage;
    obj.idattachment = id;
    if (postObj.name) obj.name = postObj.name;
    
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: AttachmentValueDto = new AttachmentValueDto();
    if (postObj.id) obj.id = postObj.id;
    if (postObj.idlanguage) obj.idlanguage = postObj.idlanguage;
    if (postObj.idattachment) obj.idattachment = postObj.idattachment;
    if (postObj.name) obj.name = postObj.name;
    return obj;
  }


  // toDto(obj: any): Idto {
  //   const rez = new AttachmentValueDto();
  //   rez.id = obj._id;
  //   rez.idlanguage = obj.idlanguage;
  //   rez.idattachment = obj.idattachment;
  //   rez.name = obj.name;

  //   return rez;
  // }

  // // UNVERIFIED

  // async add(postObj: AttachmentValueDto): Promise<AttachmentValueDto> {
  //   const obj = await this.attachmentValueRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.attachmentValueRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(
  //   id: string,
  //   putObj: AttachmentValueDto,
  // ): Promise<AttachmentValueDto> {
  //   const obj = await this.attachmentValueRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(
  //   input: string,
  //   name: string,
  // ): Promise<AttachmentValueDto> {
  //   const rLDTO = new RequestListDTO();
  //   rLDTO.page = 1;
  //   rLDTO.onpage = 1;
  //   rLDTO.filters = [];

  //   const tf = new RequestFilterDTO();
  //   tf.field = 'name';
  //   tf.values = [name];

  //   rLDTO.filters.push(tf);

  //   const tf1 = new RequestFilterDTO();
  //   tf1.field = 'idlanguage';
  //   tf1.values = [input];

  //   rLDTO.filters.push(tf1);

  //   const objects = await this.getAll(rLDTO);

  //   return objects[0];
  // }

  // async getAllPopulate(
  //   options: RequestListDTO,
  // ): Promise<ResultAttachmentDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idattachment', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.attachmentValueRepository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<ResultAttachmentDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idattachment', 'idlanguage'];

  //   const obj = await this.attachmentValueRepository.findById(
  //     id,
  //     requestPopulateDTO,
  //   );
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez = new AttachmentPopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = await this.attachmentService.getById(obj.idattachment);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.name = obj.name;

  //   return this.attachmentService.fromPopulateToResult(rez);
  // }

  // async toTypeValuePopulateDtoArray(objs: AttachmentPopulateDto[]) {
  //   const rez = new Array<ResultAttachmentDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.attachmentValueRepository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}