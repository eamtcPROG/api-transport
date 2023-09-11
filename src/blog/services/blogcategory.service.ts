import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlogCategoryRepository } from '../repositories/blogcategory.repository';
import { BlogCategoryDto } from '../dto/blogcategory.dto';
import { BlogCategory } from '../schemas/blogcategory.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultBlogCategoryDto } from '../dto/resultblogcategory.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';


import { BlogCategoryValueDto } from '../dto/blogcategoryvalue.dto';
import { BlogCategoryValueService } from './blogcategoryvalue.service';
import { LinkBlogCategoryDto } from '../dto/linkblogcategory.dto';
import { PostBlogCategoryDto } from '../dto/postblogcategory.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { BlogCategoryPopulateDto } from '../dto/blogcategorypopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class BlogCategoryService
  extends GeneralService<BlogCategoryRepository, BlogCategoryValueService>
  implements IService {
  constructor(
    private readonly blogCategoryRepository: BlogCategoryRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => BlogCategoryValueService))
    private readonly blogCategoryValueService: BlogCategoryValueService,
  ) {
    super(blogCategoryRepository, blogCategoryValueService);
  }

  getKeys(): any[] {
    const rez = [];
    return rez;
  }
  // toDto(obj: any): Idto {
  //   const rez = new BlogCategoryDto();
  //   rez.id = obj._id;
  //   rez.status = obj.status;
  //   rez.ordercriteria = obj.ordercriteria;
  //   rez.idparent = obj.idparent;
  //   rez.level = obj.level;
  //   rez.code = obj.code;

  //   rez.idtypeblogcategory = obj.idtypeblogcategory;

  //   return rez;
  // }

  toDto(obj: any): Idto {
    const rez = new BlogCategoryDto();
    obj = JSON.parse(JSON.stringify(obj));
    rez.id = this.blogCategoryRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idtypeblogcategory'))
      rez.idtypeblogcategory = this.blogCategoryRepository.getParsedIdStr(obj.idtypeblogcategory);
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('ordercriteria')) rez.ordercriteria = obj.ordercriteria;
    if (obj.hasOwnProperty('idparent')) rez.idparent = obj.idparent;
    if (obj.hasOwnProperty('level')) rez.level = obj.level;
    if (obj.hasOwnProperty('code')) rez.code = obj.code;

    if (obj.hasOwnProperty('allvalues')) rez.allvalues = obj.allvalues;
    if (obj.hasOwnProperty('_values')) {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;
      if (obj._values.hasOwnProperty('name')) rez.name = obj._values.name;
    }
    if (obj.hasOwnProperty('typeblogcategory')) rez.typeblogcategory = obj.typeblogcategory;
    
    
    return rez;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    const obj: BlogCategoryDto = new BlogCategoryDto();
    
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('ordercriteria')) obj.ordercriteria = postObj.ordercriteria;
    if (postObj.hasOwnProperty('idtypeblogcategory') && postObj.idtypeblogcategory) obj.idtypeblogcategory = postObj.idtypeblogcategory;
    
    if (postObj.hasOwnProperty('idparent')) obj.idparent = postObj.idparent;
    else obj.idparent = '';
    
    const previousObj: any = await this.getBlogCategoryByIdParent(obj.idparent);
    
    if (obj.idparent != '') {
    
      const parent: any = await this.getById(obj.idparent);
      if (parent == null) return null;
      if (previousObj == null) {
        obj.code = parent.code + 'AAAA';
        
    
      } else {
        obj.code =
          parent.code + CommonTools.incrementLastCharacter(previousObj.code);
    
      }
      obj.level = parent.level + 1;
    } else {
      obj.code =
        previousObj == null
          ? 'AAAA'
          : CommonTools.incrementLastCharacter(previousObj.code);
      obj.level = 0;

    }

    return obj;
  }

  // UNVERIFIED

  async getBlogCategoryByIdParent(id: string): Promise<Idto> {
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 999999999;
    rLDTO.filters = [];

    const tf = new RequestFilterDTO();
    tf.field = 'idparent';
    tf.values = [id];

    rLDTO.filters.push(tf);

    const objects: any = await this.getSortedByCode(rLDTO);

    if (objects == null) return null;

    
    return objects[0];
  }

  // async prepareToAdd(obj: PostBlogCategoryDto): Promise<any> {
  //   const linkBlogCategoryDto = new LinkBlogCategoryDto();

  //   const objectType: any = new BlogCategoryDto();

  //   objectType.status = obj.status;
  //   objectType.ordercriteria = obj.ordercriteria;

  //   objectType.idtypeblogcategory = obj.idtypeblogcategory;
  //   objectType.idparent = obj.idparent != undefined ? obj.idparent : '';

  //   const previousObj: any = await this.getBlogCategoryByIdParent(
  //     objectType.idparent,
  //   );
  //   if (objectType.idparent != '') {
  //     const parent: any = await this.getById(objectType.idparent);
  //     if (parent == null) return null;
  //     if (previousObj == null) {
  //       objectType.code = parent.code + 'AAAA';
  //     } else {
  //       objectType.code =
  //         parent.code + CommonTools.incrementLastCharacter(previousObj.code);
  //     }
  //     objectType.level = parent.level + 1;
  //   } else {
  //     objectType.code =
  //       previousObj == null
  //         ? 'AAAA'
  //         : CommonTools.incrementLastCharacter(previousObj.code);
  //     objectType.level = 0;
  //   }

  //   linkBlogCategoryDto.type = objectType;

  //   const objectValue = new BlogCategoryValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   linkBlogCategoryDto.value = objectValue;
  //   return linkBlogCategoryDto;
  // }

  // async addTypeWithValue(
  //   obj: PostBlogCategoryDto,
  // ): Promise<ResultBlogCategoryDto> {
  //   const objects = await this.prepareToAdd(obj);
  //   if (objects == null) return null;

  //   let typeObj: any;
  //   if (obj.idblogcategory == undefined || obj.idblogcategory == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idblogcategory, objects.type);
  //   }

  //   const valueObjToAdd: BlogCategoryValueDto = new BlogCategoryValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.idblogcategory = typeObj.id;
  //   valueObjToAdd.name = objects.value.name;

  //   const valueObj: any = await this.blogCategoryValueService.save(valueObjToAdd);

  //   const result: any = this.toTypeResult(typeObj, valueObj);

  //   const rez: any = await this.blogCategoryValueService.findByIdAndPopulate(
  //     result.id,
  //   );
  //   return rez;
  // }

  // toTypeResult(
  //   tObj: BlogCategoryDto,
  //   vObj: BlogCategoryValueDto,
  // ): ResultBlogCategoryDto {
  //   const result: ResultBlogCategoryDto = new ResultBlogCategoryDto();

  //   result.idlanguage = vObj.idlanguage;
  //   result.name = vObj.name;

  //   result.status = tObj.status;
  //   result.id = vObj.id;
  //   result.idblogcategory = tObj.id;

  //   result.ordercriteria = tObj.ordercriteria;
  //   result.idparent = tObj.idparent;
  //   result.level = tObj.level;
  //   result.code = tObj.code;

  //   result.idtypeblogcategory = tObj.idtypeblogcategory;

  //   return result;
  // }

  async getSortedByCode(options: RequestListDTO): Promise<Idto[]> {
    const objs = await this.blogCategoryRepository.findSortedByCode(options);
    // console.log('getSortedByCode', objs)
    if (objs == null) return null;
    return this.toDtoArray(objs);
  }


  // async add(postObj: object): Promise<Idto> {
  //   const obj: any = await this.blogCategoryRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj: any = await this.blogCategoryValueService.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idblogcategory;
  //   const obj: any = await this.blogCategoryRepository.delete(id);
  //   await this.blogCategoryValueService.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<Idto> {
  //   const obj: any = await this.blogCategoryRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated: any = await this.getById(id);

  //   return objUpdated;
  // }

  // fromPopulateToResult(obj: BlogCategoryPopulateDto): ResultBlogCategoryDto {
  //   const result: ResultBlogCategoryDto = new ResultBlogCategoryDto();

  //   result.id = obj.id;

  //   result.name = obj.name;
  //   result.idlanguage = obj.language.id;
  //   result.language = obj.language.name;
  //   result.status = obj.typeobject.status;

  //   result.idblogcategory = obj.typeobject.id;

  //   result.ordercriteria = obj.typeobject.ordercriteria;
  //   result.idparent = obj.typeobject.idparent;
  //   result.idtypeblogcategory = obj.typeobject.idtypeblogcategory;

  //   result.level = obj.typeobject.level;
  //   result.code = obj.typeobject.code;

  //   return result;
  // }

  // prepareToUpdate(obj: ResultBlogCategoryDto): LinkBlogCategoryDto {
  //   const blogCategoryDto = new LinkBlogCategoryDto();

  //   const objectType = new BlogCategoryDto();

  //   objectType.status = obj.status;
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.idtypeblogcategory = obj.idtypeblogcategory;

  //   blogCategoryDto.type = objectType;

  //   const objectValue = new BlogCategoryValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.idblogcategory = obj.idblogcategory;
  //   objectValue.name = obj.name;

  //   blogCategoryDto.value = objectValue;

  //   return blogCategoryDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultBlogCategoryDto,
  // ): Promise<ResultBlogCategoryDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.blogCategoryValueService.save(objects.value, id);

  //   const objT = await this.update(obj.idblogcategory, objects.type);

  //   if (objV == null || objT == null) return null;
  //   // const result = this.toTypeResult(objT, objV);
  //   const rez = await this.blogCategoryValueService.findByIdAndPopulate(id);
  //   return rez;
  // }
}