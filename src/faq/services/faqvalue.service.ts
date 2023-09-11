import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FAQValueRepository } from '../repositories/faqvalue.repository';
import { FAQValueDto } from '../dto/faqvalue.dto';
import { FAQPopulateDto } from '../dto/faqpopulate.dto';

import { FAQValue } from '../schemas/faqvalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';

import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { FAQService } from './faq.service';
import { ResultFAQDto } from '../dto/resultfaq.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class FAQValueService
  extends GeneralService<FAQValueRepository, null>
  implements IService
{
  constructor(
    private readonly faqValueRepository: FAQValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => FAQService))
    private readonly faqService: FAQService,
  ) {
    super(faqValueRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idfaq']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new FAQValueDto();

    rez.id = this.faqValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idfaq'))
      rez.idfaq = this.faqValueRepository.getParsedIdStr(obj.idfaq);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.faqValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('answer')) rez.answer = obj.answer;
    if (obj.hasOwnProperty('question')) rez.question = obj.question;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;

    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto{
    if (!postObj.hasOwnProperty('idlanguage')) return null;

    const obj: FAQValueDto = new FAQValueDto();
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    obj.idfaq = id;
    if (postObj.hasOwnProperty('answer')) obj.answer = postObj.answer;
    if (postObj.hasOwnProperty('question')) obj.question = postObj.question;
    

    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: FAQValueDto = new FAQValueDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idfaq')) obj.idfaq = postObj.idfaq;
    if (postObj.hasOwnProperty('answer')) obj.answer = postObj.answer;
    if (postObj.hasOwnProperty('question')) obj.question = postObj.question;
    return obj;
  }


  // toDto(obj: any): Idto {
  //   const rez = new FAQValueDto();
  //   rez.id = obj._id;
  //   rez.idlanguage = obj.idlanguage;
  //   rez.idfaq = obj.idfaq;
  //   rez.answer = obj.answer;
  //   rez.question = obj.question;

  //   return rez;
  // }

  // // UNVERIFIED

  // async add(postObj: FAQValueDto): Promise<FAQValueDto> {
  //   const obj = await this.faqValueRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.faqValueRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: FAQValueDto): Promise<FAQValueDto> {
  //   const obj = await this.faqValueRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(input: string, name: string): Promise<FAQValueDto> {
  //   const rLDTO = new RequestListDTO();
  //   rLDTO.page = 1;
  //   rLDTO.onpage = 1;
  //   rLDTO.filters = [];

  //   const tf = new RequestFilterDTO();
  //   tf.field = 'question';
  //   tf.values = [name];

  //   rLDTO.filters.push(tf);

  //   const tf1 = new RequestFilterDTO();
  //   tf1.field = 'idlanguage';
  //   tf1.values = [input];

  //   rLDTO.filters.push(tf1);

  //   const objects = await this.getAll(rLDTO);

  //   return objects[0];
  // }

  // async getAllPopulate(options: RequestListDTO): Promise<ResultFAQDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idfaq', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.faqValueRepository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<ResultFAQDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idfaq', 'idlanguage'];

  //   const obj = await this.faqValueRepository.findById(id, requestPopulateDTO);
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez = new FAQPopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = await this.faqService.getById(obj.idfaq);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.answer = obj.answer;
  //   rez.question = obj.question;

  //   return this.faqService.fromPopulateToResult(rez);
  // }

  // async toTypeValuePopulateDtoArray(objs: FAQPopulateDto[]) {
  //   const rez = new Array<ResultFAQDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.faqValueRepository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}