import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlogValueRepository } from '../repositories/blogvalue.repository';
import { BlogValueDto } from '../dto/blogvalue.dto';
import { BlogPopulateDto } from '../dto/blogpopulate.dto';

import { BlogValue } from '../schemas/blogvalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';

import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { BlogService } from './blog.service';
import { ResultBlogDto } from '../dto/resultblog.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import { UrlRelationService } from 'src/app/services/urlrelation.service';

@Injectable()
export class BlogValueService
  extends GeneralService<BlogValueRepository, null>
  implements IService
{
  constructor(
    private readonly blogValueRepository: BlogValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => BlogService))
    private readonly blogService: BlogService,

    @Inject(forwardRef(() => UrlRelationService))
    private readonly urlRelationService: UrlRelationService,
  ) {
    super(blogValueRepository);
  }
  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idblog']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new BlogValueDto();

    rez.id = this.blogValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idblog'))
      rez.idblog = this.blogValueRepository.getParsedIdStr(obj.idblog);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.blogValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('title')) rez.title = obj.title;
    if (obj.hasOwnProperty('content')) rez.content = obj.content;
    if (obj.hasOwnProperty('descriptionmeta')) rez.descriptionmeta = obj.descriptionmeta;
    if (obj.hasOwnProperty('keymeta')) rez.keymeta = obj.keymeta;
    if (obj.hasOwnProperty('url')) rez.url = obj.url;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;

    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto{
    if (!postObj.idlanguage) return null;

    const obj: BlogValueDto = new BlogValueDto();
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    obj.idblog = id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('title')) obj.title = postObj.title;
    if (postObj.hasOwnProperty('content')) obj.content = postObj.content;
    if (postObj.hasOwnProperty('descriptionmeta')) obj.descriptionmeta = postObj.descriptionmeta;
    if (postObj.hasOwnProperty('keymeta')) obj.keymeta = postObj.keymeta;
    if (postObj.hasOwnProperty('url')) obj.url = postObj.url;

    
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: BlogValueDto = new BlogValueDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idblog')) obj.idblog = postObj.idblog;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('title')) obj.title = postObj.title;
    if (postObj.hasOwnProperty('content')) obj.content = postObj.content;
    if (postObj.hasOwnProperty('descriptionmeta')) obj.descriptionmeta = postObj.descriptionmeta;
    if (postObj.hasOwnProperty('keymeta')) obj.keymeta = postObj.keymeta;
    if (postObj.hasOwnProperty('url')) obj.url = postObj.url;
    
    return obj;
  }

  async saveOtherData (obj: any, postObj: any) {
    if(obj.hasOwnProperty('idblog') && obj.hasOwnProperty('url')) await this.urlRelationService.registerUrlRelation('blog',obj.idblog.toString(), obj.url);
  }

  // toDto(obj: any): Idto {
  //   const rez = new BlogValueDto();
  //   rez.id = obj._id;
  //   rez.idlanguage = obj.idlanguage;
  //   rez.idblog = obj.idblog;
  //   rez.name = obj.name;
  //   rez.title = obj.title;
  //   rez.content = obj.content;
  //   rez.descriptionmeta = obj.descriptionmeta;
  //   rez.keymeta = obj.keymeta;
  //   rez.url = obj.url;

  //   return rez;
  // }

  // // UNVERIFIED

  // async add(postObj: BlogValueDto): Promise<BlogValueDto> {
  //   const obj = await this.blogValueRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.blogValueRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: BlogValueDto): Promise<BlogValueDto> {
  //   const obj = await this.blogValueRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(input: string, name: string): Promise<BlogValueDto> {
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

  // async getAllPopulate(options: RequestListDTO): Promise<ResultBlogDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idblog', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.blogValueRepository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<ResultBlogDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idblog', 'idlanguage'];

  //   const obj = await this.blogValueRepository.findById(id, requestPopulateDTO);
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez = new BlogPopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = await this.blogService.getById(obj.idblog);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.name = obj.name;
  //   rez.content = obj.content;
  //   rez.title = obj.title;
  //   rez.descriptionmeta = obj.descriptionmeta;
  //   rez.keymeta = obj.keymeta;
  //   rez.url = obj.url;

  //   return this.blogService.fromPopulateToResult(rez);
  // }

  // async toTypeValuePopulateDtoArray(objs: BlogPopulateDto[]) {
  //   const rez = new Array<ResultBlogDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.blogValueRepository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}