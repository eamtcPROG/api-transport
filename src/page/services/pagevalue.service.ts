import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PageValueRepository } from '../repositories/pagevalue.repository';
import { PageValueDto } from '../dto/pagevalue.dto';
import { PagePopulateDto } from '../dto/pagepopulate.dto';

import { PageValue } from '../schemas/pagevalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';

import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { PageService } from './page.service';
import { ResultPageDto } from '../dto/resultpage.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import { UrlRelationService } from 'src/app/services/urlrelation.service';


@Injectable()
export class PageValueService
  extends GeneralService<PageValueRepository, null>
  implements IService {
  constructor(
    private readonly pageValueRepository: PageValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => PageService))
    private readonly pageService: PageService,
    @Inject(forwardRef(() => UrlRelationService))
    private readonly urlRelationService: UrlRelationService,

  ) {
    super(pageValueRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idpage']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new PageValueDto();

    rez.id = this.pageValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idpage'))
      rez.idpage = this.pageValueRepository.getParsedIdStr(obj.idpage);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.pageValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('content')) rez.content = obj.content;
    if (obj.hasOwnProperty('descriptionmeta')) rez.descriptionmeta = obj.descriptionmeta;
    if (obj.hasOwnProperty('keymeta')) rez.keymeta = obj.keymeta;
    if (obj.hasOwnProperty('title')) rez.title = obj.title;
    if (obj.hasOwnProperty('url')) rez.url = obj.url;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;


    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto {
    if (!postObj.hasOwnProperty('idlanguage')) return null;

    const obj: PageValueDto = new PageValueDto();
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    obj.idpage = id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('content')) obj.content = postObj.content;
    if (postObj.hasOwnProperty('descriptionmeta')) obj.descriptionmeta = postObj.descriptionmeta;
    if (postObj.hasOwnProperty('keymeta')) obj.keymeta = postObj.keymeta;
    if (postObj.hasOwnProperty('title')) obj.title = postObj.title;
    if (postObj.hasOwnProperty('url')) obj.url = postObj.url;


    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: PageValueDto = new PageValueDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idpage')) obj.idpage = postObj.idpage;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('content')) obj.content = postObj.content;
    if (postObj.hasOwnProperty('descriptionmeta')) obj.descriptionmeta = postObj.descriptionmeta;
    if (postObj.hasOwnProperty('keymeta')) obj.keymeta = postObj.keymeta;
    if (postObj.hasOwnProperty('title')) obj.title = postObj.title;
    if (postObj.hasOwnProperty('url')) obj.url = postObj.url;

    return obj;
  }

  async saveOtherData (obj: any, postObj: any) {
    if(obj.hasOwnProperty('idpage') && obj.hasOwnProperty('url')) await this.urlRelationService.registerUrlRelation('page',obj.idpage.toString(), obj.url);
  }
  // toDto(obj: any): Idto {
  //   const rez = new PageValueDto();
  //   rez.id = obj._id;
  //   rez.idlanguage = obj.idlanguage;
  //   rez.idpage = obj.idpage;
  //   rez.name = obj.name;
  //   rez.content = obj.content;
  //   rez.descriptionmeta = obj.descriptionmeta;
  //   rez.keymeta = obj.keymeta;
  //   rez.title = obj.title;
  //   rez.url = obj.url;

  //   return rez;
  // }

  // // UNVERIFIED

  // async add(postObj: PageValueDto): Promise<PageValueDto> {
  //   const obj = await this.pageValueRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.pageValueRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: PageValueDto): Promise<PageValueDto> {
  //   const obj = await this.pageValueRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(input: string, name: string): Promise<PageValueDto> {
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
  //   if (objects == null) return null;

  //   return objects[0];
  // }

  // async getAllPopulate(options: RequestListDTO): Promise<ResultPageDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idpage', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.pageValueRepository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<ResultPageDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idpage', 'idlanguage'];

  //   const obj = await this.pageValueRepository.findById(id, requestPopulateDTO);
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez = new PagePopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = await this.pageService.getById(obj.idpage);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.name = obj.name;
  //   rez.content = obj.content;
  //   rez.descriptionmeta = obj.descriptionmeta;
  //   rez.keymeta = obj.keymeta;
  //   rez.title = obj.title;
  //   rez.url = obj.url;

  //   return this.pageService.fromPopulateToResult(rez);
  // }

  // async toTypeValuePopulateDtoArray(objs: PagePopulateDto[]) {
  //   const rez = new Array<ResultPageDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.pageValueRepository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}