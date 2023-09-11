import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FAQRepository } from '../repositories/faq.repository';
import { FAQDto } from '../dto/faq.dto';
import { FAQ } from '../schemas/faq.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultFAQDto } from '../dto/resultfaq.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';


import { FAQValueDto } from '../dto/faqvalue.dto';
import { FAQValueService } from './faqvalue.service';
import { LinkFAQDto } from '../dto/linkfaq.dto';
import { PostFAQDto } from '../dto/postfaq.dto';
import { FAQPopulateDto } from '../dto/faqpopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class FAQService
  extends GeneralService<FAQRepository, FAQValueService>
  implements IService {
  constructor(
    private readonly faqRepository: FAQRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => FAQValueService))
    private readonly faqValueService: FAQValueService,
  ) {
    super(faqRepository, faqValueService);
  }

  getKeys(): any[] {
    const rez = [];
    // rez.push(['idattachment', 'idgallery', 'idvideo']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new FAQDto();

    rez.id = this.faqRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idattachment') && obj.idattachment) rez.idattachment = this.faqRepository.getParsedIdStr(obj.idattachment);
    if (obj.hasOwnProperty('idvideo') && obj.idattachment) rez.idvideo = this.faqRepository.getParsedIdStr(obj.idvideo);
    if (obj.hasOwnProperty('idgallery') && obj.idattachment) rez.idgallery = this.faqRepository.getParsedIdStr(obj.idgallery);

    if (obj.hasOwnProperty('idobject')) rez.idobject = obj.idobject;
    if (obj.hasOwnProperty('ordercriteria')) rez.ordercriteria = obj.ordercriteria;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('type')) rez.type = obj.type;
    if (obj.hasOwnProperty('allvalues')) rez.allvalues = obj.allvalues;
    if (obj.hasOwnProperty('_values'))
    {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('question')) rez.question = obj._values.question;
      if (obj._values.hasOwnProperty('answer')) rez.answer = obj._values.answer;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;
    }
    if (obj.hasOwnProperty('attachment') && obj.attachment) rez.attachment = obj.attachment;
    if (obj.hasOwnProperty('video') && obj.video) rez.video = obj.video;
    if (obj.hasOwnProperty('gallery') && obj.gallery) rez.gallery = obj.gallery;
    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: FAQDto = new FAQDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idattachment')) obj.idattachment = postObj.idattachment;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('type')) obj.type = postObj.type;
    if (postObj.hasOwnProperty('idgallery')) obj.idgallery = postObj.idgallery;
    if (postObj.hasOwnProperty('idvideo')) obj.idvideo = postObj.idvideo;
    if (postObj.hasOwnProperty('idobject')) obj.idobject = postObj.idobject;
    if (postObj.hasOwnProperty('ordercriteria')) obj.ordercriteria = postObj.ordercriteria;

    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new FAQDto();
  //   rez.id = obj._id;
  //   rez.status = obj.status;
  //   rez.ordercriteria = obj.ordercriteria;
  //   rez.idobject = obj.idobject;
  //   rez.type = obj.type;
  //   rez.idattachment = obj.idattachment;
  //   rez.idgallery = obj.idgallery;

  //   rez.idvideo = obj.idvideo;
  //   return rez;
  // }

  // // UNVERIFIED

  // prepareToAdd(obj: PostFAQDto): LinkFAQDto {
  //   const linkFAQDto = new LinkFAQDto();

  //   const objectType = new FAQDto();

  //   objectType.status = obj.status;
  //   objectType.idobject = obj.idobject != undefined ? obj.idobject : '';
  //   objectType.type = obj.type;
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.idattachment = obj.idattachment;
  //   objectType.idgallery = obj.idgallery;
  //   objectType.idvideo = obj.idvideo;

  //   linkFAQDto.type = objectType;

  //   const objectValue = new FAQValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.answer = obj.answer;
  //   objectValue.question = obj.question;

  //   linkFAQDto.value = objectValue;
  //   return linkFAQDto;
  // }

  // async addTypeWithValue(obj: PostFAQDto): Promise<ResultFAQDto> {
  //   const objects = this.prepareToAdd(obj);

  //   let typeObj;
  //   if (obj.idfaq == undefined || obj.idfaq == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idfaq, objects.type);
  //   }

  //   const valueObjToAdd: FAQValueDto = new FAQValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.idfaq = typeObj.id;
  //   valueObjToAdd.answer = objects.value.answer;
  //   valueObjToAdd.question = objects.value.question;

  //   const valueObj = await this.faqValueService.save(valueObjToAdd);

  //   const result = this.toTypeResult(typeObj, valueObj);
  //   const rez = await this.faqValueService.findByIdAndPopulate(result.id);
  //   return rez;
  // }

  // toTypeResult(tObj: FAQDto, vObj: FAQValueDto): ResultFAQDto {
  //   const result: ResultFAQDto = new ResultFAQDto();

  //   result.idlanguage = vObj.idlanguage;
  //   result.answer = vObj.answer;
  //   result.question = vObj.question;

  //   result.status = tObj.status;
  //   result.id = vObj.id;
  //   result.idfaq = tObj.id;

  //   result.ordercriteria = tObj.ordercriteria;
  //   result.idobject = tObj.idobject;
  //   result.type = tObj.type;

  //   result.idattachment = tObj.idattachment;
  //   result.idgallery = tObj.idgallery;
  //   result.idvideo = tObj.idvideo;

  //   return result;
  // }

  // fromPopulateToResult(obj: FAQPopulateDto): ResultFAQDto {
  //   const result: ResultFAQDto = new ResultFAQDto();

  //   result.id = obj.id;

  //   result.idlanguage = obj.language.id;
  //   result.answer = obj.answer;
  //   result.question = obj.question;
  //   result.language = obj.language.name;
  //   result.status = obj.typeobject.status;

  //   result.idfaq = obj.typeobject.id;

  //   result.ordercriteria = obj.typeobject.ordercriteria;
  //   result.idobject = obj.typeobject.idobject;
  //   result.type = obj.typeobject.type;

  //   result.idattachment = obj.typeobject.idattachment;
  //   result.idgallery = obj.typeobject.idgallery;
  //   result.idvideo = obj.typeobject.idvideo;

  //   return result;
  // }

  // async add(postObj: object): Promise<FAQDto> {
  //   const obj = await this.faqRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj = await this.faqValueService.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idfaq;
  //   const obj = await this.faqRepository.delete(id);
  //   await this.faqValueService.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<FAQDto> {
  //   const obj = await this.faqRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // prepareToUpdate(obj: ResultFAQDto): LinkFAQDto {
  //   const faqDto = new LinkFAQDto();

  //   const objectType = new FAQDto();

  //   objectType.status = obj.status;
  //   objectType.idobject = obj.idobject != undefined ? obj.idobject : '';
  //   objectType.type = obj.type;
  //   objectType.ordercriteria = obj.ordercriteria;

  //   objectType.idattachment = obj.idattachment;
  //   objectType.idgallery = obj.idgallery;
  //   objectType.idvideo = obj.idvideo;

  //   faqDto.type = objectType;

  //   const objectValue = new FAQValueDto();
  //   objectValue.idlanguage = obj.idlanguage;

  //   objectValue.idfaq = obj.idfaq;
  //   objectValue.answer = obj.answer;
  //   objectValue.question = obj.question;

  //   faqDto.value = objectValue;

  //   return faqDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultFAQDto,
  // ): Promise<ResultFAQDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.faqValueService.save(objects.value, id);

  //   const objT = await this.update(obj.idfaq, objects.type);

  //   if (objV == null || objT == null) return null;
  //   // const result = this.toTypeResult(objT, objV);
  //   const rez = await this.faqValueService.findByIdAndPopulate(id);
  //   return rez;
  // }
}