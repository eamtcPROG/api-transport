import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlogCategoryValueRepository } from '../repositories/blogcategoryvalue.repository';
import { BlogCategoryValueDto } from '../dto/blogcategoryvalue.dto';
import { BlogCategoryPopulateDto } from '../dto/blogcategorypopulate.dto';

import { BlogCategoryValue } from '../schemas/blogcategoryvalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';

import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { BlogCategoryService } from './blogcategory.service';
import { ResultBlogCategoryDto } from '../dto/resultblogcategory.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class BlogCategoryValueService
  extends GeneralService<BlogCategoryValueRepository, null>
  implements IService
{

  
  constructor(
    private readonly blogCategoryValueRepository: BlogCategoryValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => BlogCategoryService))
    private readonly blogCategoryService: BlogCategoryService,
  ) {
    super(blogCategoryValueRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idblogcategory']);
    return rez;
  }
  
  toDto(obj: any): Idto {
    const rez = new BlogCategoryValueDto();
    rez.id = this.blogCategoryValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idblogcategory'))
      rez.idblogcategory = this.blogCategoryValueRepository.getParsedIdStr(obj.idblogcategory);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.blogCategoryValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;
    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto{
    if (!postObj.hasOwnProperty('idlanguage')) return null;

    const obj: BlogCategoryValueDto = new BlogCategoryValueDto();
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    obj.idblogcategory = id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: BlogCategoryValueDto = new BlogCategoryValueDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idblogcategory')) obj.idblogcategory = postObj.idblogcategory;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    return obj;
  }

  // UNVERIFIED

  // async add(postObj: BlogCategoryValueDto): Promise<Idto> {
  //   const obj = await this.blogCategoryValueRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.blogCategoryValueRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(
  //   id: string,
  //   putObj: BlogCategoryValueDto,
  // ): Promise<Idto> {
  //   const obj:any = await this.blogCategoryValueRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated:any = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(
  //   input: string,
  //   name: string,
  // ): Promise<Idto> {
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

  // async getAllPopulate(
  //   options: RequestListDTO,
  // ): Promise<ResultBlogCategoryDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idblogcategory', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.blogCategoryValueRepository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<ResultBlogCategoryDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idblogcategory', 'idlanguage'];

  //   const obj = await this.blogCategoryValueRepository.findById(
  //     id,
  //     requestPopulateDTO,
  //   );
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez:any = new BlogCategoryPopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = await this.blogCategoryService.getById(obj.idblogcategory);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.name = obj.name;

  //   return this.blogCategoryService.fromPopulateToResult(rez);
  // }

  // async toTypeValuePopulateDtoArray(objs: BlogCategoryPopulateDto[]):Promise<any> {
  //   const rez:any[] = new Array<ResultBlogCategoryDto>();

  //   objs.map(async (item):Promise<any> => {
  //     const obj:any = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj:any = await this.blogCategoryValueRepository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}