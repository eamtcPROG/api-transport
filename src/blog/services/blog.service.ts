import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlogRepository } from '../repositories/blog.repository';
import { BlogDto } from '../dto/blog.dto';
import { Blog } from '../schemas/blog.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultBlogDto } from '../dto/resultblog.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';


import { BlogValueDto } from '../dto/blogvalue.dto';
import { BlogValueService } from './blogvalue.service';
import { LinkBlogDto } from '../dto/linkblog.dto';
import { PostBlogDto } from '../dto/postblog.dto';
import { BlogPopulateDto } from '../dto/blogpopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class BlogService
  extends GeneralService<BlogRepository, BlogValueService>
  implements IService
{
  constructor(
    private readonly blogRepository: BlogRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => BlogValueService))
    private readonly blogValueService: BlogValueService,
  ) {
    super(blogRepository, blogValueService);
  }

  getKeys(): any[] {
    const rez = [];
    
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new BlogDto();
    
    rez.id = this.blogRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idattachment') && obj.idattachment)
      rez.idattachment = this.blogRepository.getParsedIdStr(obj.idattachment);
    if (obj.hasOwnProperty('idgallery') && obj.idattachment)
      rez.idgallery = this.blogRepository.getParsedIdStr(obj.idgallery);
    if (obj.hasOwnProperty('idvideo') && obj.idattachment)
      rez.idvideo = this.blogRepository.getParsedIdStr(obj.idvideo);
    if (obj.hasOwnProperty('idblogcategory'))
      rez.idblogcategory = this.blogRepository.getParsedIdStr(
        obj.idblogcategory,
      );
    if (obj.hasOwnProperty('type')) rez.type = obj.type;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;

    if (obj.hasOwnProperty('allvalues')) rez.allvalues = obj.allvalues;
    if (obj.hasOwnProperty('_values'))
    {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;
      if (obj._values.hasOwnProperty('name')) rez.name = obj._values.name;
      if (obj._values.hasOwnProperty('url')) rez.url = obj._values.url;
      if (obj._values.hasOwnProperty('title')) rez.title = obj._values.title;
      if (obj._values.hasOwnProperty('keymeta')) rez.keymeta = obj._values.keymeta;
      if (obj._values.hasOwnProperty('descriptionmeta')) rez.descriptionmeta = obj._values.descriptionmeta;
      if (obj._values.hasOwnProperty('content')) rez.content = obj._values.content;
    }
    if(obj.hasOwnProperty('blogcategory')) rez.blogcategory = obj.blogcategory;
    if (obj.hasOwnProperty('attachment') && obj.attachment) rez.attachment = obj.attachment;
    if (obj.hasOwnProperty('video') && obj.video) rez.video = obj.video;
    if (obj.hasOwnProperty('gallery') && obj.gallery) rez.gallery = obj.gallery;
    if(obj.hasOwnProperty('fullurl')) rez.fullurl = obj.fullurl;
    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: BlogDto = new BlogDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('type')) obj.type = postObj.type;
    if (postObj.hasOwnProperty('idattachment') && postObj.idattachment) obj.idattachment = postObj.idattachment;
    if (postObj.hasOwnProperty('idgallery') && postObj.idgallery) obj.idgallery = postObj.idgallery;
    if (postObj.hasOwnProperty('idvideo') && postObj.idvideo) obj.idvideo = postObj.idvideo;
    if (postObj.hasOwnProperty('idblogcategory') && postObj.idblogcategory) obj.idblogcategory = postObj.idblogcategory;

    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new BlogDto();
  //   rez.id = obj._id;
  //   rez.type = obj.type;
  //   rez.status = obj.status;
  //   rez.idattachment = obj.idattachment;
  //   rez.idgallery = obj.idgallery;
  //   rez.idvideo = obj.idvideo;
  //   rez.idblogcategory = obj.idblogcategory;
  //   return rez;
  // }
  // // UNVERIFIED

  // prepareToAdd(obj: PostBlogDto): LinkBlogDto {
  //   const linkBlogDto = new LinkBlogDto();

  //   const objectType = new BlogDto();
  //   objectType.type = obj.type;
  //   objectType.status = obj.status;

  //   objectType.idattachment = obj.idattachment;
  //   objectType.idgallery = obj.idgallery;
  //   objectType.idvideo = obj.idvideo;
  //   objectType.idblogcategory = obj.idblogcategory;

  //   linkBlogDto.type = objectType;

  //   const objectValue = new BlogValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;
  //   objectValue.content = obj.content;
  //   objectValue.title = obj.title;
  //   objectValue.descriptionmeta = obj.descriptionmeta;
  //   objectValue.keymeta = obj.keymeta;
  //   objectValue.url = obj.url;

  //   linkBlogDto.value = objectValue;
  //   return linkBlogDto;
  // }

  // async addTypeWithValue(obj: PostBlogDto): Promise<ResultBlogDto> {
  //   const objects = this.prepareToAdd(obj);
  //   const checkDuplicate = await this.blogValueService.getLanguageAndName(
  //     objects.value.idlanguage,
  //     objects.value.name,
  //   );
  //   if (checkDuplicate != null) return null;

  //   let typeObj;
  //   if (obj.idblog == undefined || obj.idblog == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idblog, objects.type);
  //   }

  //   const valueObjToAdd: BlogValueDto = new BlogValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.name = objects.value.name;
  //   valueObjToAdd.idblog = typeObj.id;
  //   valueObjToAdd.content = objects.value.content;
  //   valueObjToAdd.title = objects.value.title;
  //   valueObjToAdd.descriptionmeta = objects.value.descriptionmeta;
  //   valueObjToAdd.keymeta = objects.value.keymeta;
  //   valueObjToAdd.url = objects.value.url;

  //   const valueObj = await this.blogValueService.save(valueObjToAdd);

  //   const result = this.toTypeResult(typeObj, valueObj);
  //   const rez = await this.blogValueService.findByIdAndPopulate(result.id);
  //   return rez;
  // }

  // toTypeResult(tObj: BlogDto, vObj: BlogValueDto): ResultBlogDto {
  //   const result = new ResultBlogDto();
  //   result.idlanguage = vObj.idlanguage;
  //   result.name = vObj.name;

  //   result.type = tObj.type;
  //   result.status = tObj.status;
  //   result.id = vObj.id;

  //   result.idattachment = tObj.idattachment;
  //   result.idgallery = tObj.idgallery;
  //   result.idvideo = tObj.idvideo;
  //   result.idblogcategory = tObj.idblogcategory;

  //   result.idblog = tObj.id;
  //   result.title = vObj.title;
  //   result.content = vObj.content;
  //   result.descriptionmeta = vObj.descriptionmeta;
  //   result.keymeta = vObj.keymeta;

  //   result.url = vObj.url;

  //   return result;
  // }

  // fromPopulateToResult(obj: BlogPopulateDto): ResultBlogDto {
  //   const result: ResultBlogDto = new ResultBlogDto();

  //   result.id = obj.id;

  //   result.name = obj.name;
  //   result.idlanguage = obj.language.id;
  //   result.language = obj.language.name;
  //   result.status = obj.typeobject.status;
  //   result.type = obj.typeobject.type;

  //   result.idblog = obj.typeobject.id;
  //   result.idblogcategory = obj.typeobject.idblogcategory;

  //   result.idattachment = obj.typeobject.idattachment;
  //   result.idgallery = obj.typeobject.idgallery;
  //   result.idvideo = obj.typeobject.idvideo;

  //   result.title = obj.title;
  //   result.content = obj.content;
  //   result.descriptionmeta = obj.descriptionmeta;
  //   result.keymeta = obj.keymeta;

  //   result.url = obj.url;

  //   return result;
  // }

  // async add(postObj: object): Promise<BlogDto> {
  //   const obj = await this.blogRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj = await this.blogValueService.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idblog;
  //   const obj = await this.blogRepository.delete(id);
  //   await this.blogValueService.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<BlogDto> {
  //   const obj = await this.blogRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // prepareToUpdate(obj: ResultBlogDto): LinkBlogDto {
  //   const blogDto = new LinkBlogDto();

  //   const objectType = new BlogDto();
  //   objectType.type = obj.type;
  //   objectType.status = obj.status;

  //   objectType.idattachment = obj.idattachment;
  //   objectType.idgallery = obj.idgallery;
  //   objectType.idvideo = obj.idvideo;
  //   objectType.idblogcategory = obj.idblogcategory;
  //   blogDto.type = objectType;

  //   const objectValue = new BlogValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   objectValue.content = obj.content;
  //   objectValue.title = obj.title;
  //   objectValue.descriptionmeta = obj.descriptionmeta;
  //   objectValue.keymeta = obj.keymeta;

  //   objectValue.url = obj.url;

  //   blogDto.value = objectValue;

  //   return blogDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultBlogDto,
  // ): Promise<ResultBlogDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.blogValueService.save(objects.value, id);

  //   const objT = await this.update(obj.idblog, objects.type);

  //   if (objV == null || objT == null) return null;
  //   // const result = this.toTypeResult(objT,objV);
  //   const rez = await this.blogValueService.findByIdAndPopulate(id);
  //   return rez;
  // }
}