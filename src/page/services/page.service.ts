import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PageRepository } from '../repositories/page.repository';
import { PageDto } from '../dto/page.dto';
import { Page } from '../schemas/page.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultPageDto } from '../dto/resultpage.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';


import { PageValueDto } from '../dto/pagevalue.dto';
import { PageValueService } from './pagevalue.service';
import { LinkPageDto } from '../dto/linkpage.dto';
import { PostPageDto } from '../dto/postpage.dto';
import { PagePopulateDto } from '../dto/pagepopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class PageService extends GeneralService<PageRepository, PageValueService> implements IService {
  constructor(
    private readonly pageRepository: PageRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => PageValueService))
    private readonly pageValueService: PageValueService,
  ) {
    super(pageRepository, pageValueService);
  }

  getKeys(): any[] {
    const rez = [];
    
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new PageDto();

    rez.id = this.pageRepository.getParsedIdStr(obj._id);

    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('type')) rez.type = obj.type;
    if (obj.hasOwnProperty('idattachment') && obj.idattachment) rez.idattachment = this.pageRepository.getParsedIdStr(obj.idattachment);
    if (obj.hasOwnProperty('idvideo') && obj.idattachment) rez.idvideo = this.pageRepository.getParsedIdStr(obj.idvideo);
    if (obj.hasOwnProperty('idgallery') && obj.idattachment) rez.idgallery = this.pageRepository.getParsedIdStr(obj.idgallery);


    if (obj.hasOwnProperty('allvalues')) rez.allvalues = obj.allvalues;
    if (obj.hasOwnProperty('_values'))
    {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('name')) rez.name = obj._values.name;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;
      if (obj._values.hasOwnProperty('url')) rez.url = obj._values.url;
      if (obj._values.hasOwnProperty('title')) rez.title = obj._values.title;
      if (obj._values.hasOwnProperty('keymeta')) rez.keymeta = obj._values.keymeta;
      if (obj._values.hasOwnProperty('descriptionmeta')) rez.descriptionmeta = obj._values.descriptionmeta;
      if (obj._values.hasOwnProperty('content')) rez.content = obj._values.content;
    }
    if (obj.hasOwnProperty('fullurl')) rez.fullurl = obj.fullurl;
    
    

    if (obj.hasOwnProperty('attachment') && obj.attachment) rez.attachment = obj.attachment;
    if (obj.hasOwnProperty('video') && obj.video) rez.video = obj.video;
    if (obj.hasOwnProperty('gallery') && obj.gallery) rez.gallery = obj.gallery;

    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: PageDto = new PageDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;

    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('type')) obj.type = postObj.type;
    if (postObj.hasOwnProperty('idattachment')) obj.idattachment = postObj.idattachment;
    if (postObj.hasOwnProperty('idgallery')) obj.idgallery = postObj.idgallery;
    if (postObj.hasOwnProperty('idvideo')) obj.idvideo = postObj.idvideo;


    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new PageDto();
  //   rez.id = obj._id;
  //   rez.type = obj.type;
  //   rez.status = obj.status;
  //   rez.idattachment = obj.idattachment;
  //   rez.idgallery = obj.idgallery;
  //   rez.idvideo = obj.idvideo;
  //   return rez;
  // }

  // // UNVERIFIED

  // prepareToAdd(obj: PostPageDto): LinkPageDto {
  //   const linkPageDto = new LinkPageDto();

  //   const objectType = new PageDto();
  //   objectType.type = obj.type;
  //   objectType.status = obj.status;

  //   objectType.idattachment = obj.idattachment;
  //   objectType.idgallery = obj.idgallery;
  //   objectType.idvideo = obj.idvideo;

  //   linkPageDto.type = objectType;

  //   const objectValue = new PageValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;
  //   objectValue.content = obj.content;
  //   objectValue.descriptionmeta = obj.descriptionmeta;
  //   objectValue.keymeta = obj.keymeta;
  //   objectValue.title = obj.title;
  //   objectValue.url = obj.url;

  //   linkPageDto.value = objectValue;
  //   return linkPageDto;
  // }

  // async addTypeWithValue(obj: PostPageDto): Promise<ResultPageDto> {
  //   const objects = this.prepareToAdd(obj);
  //   const checkDuplicate = await this.pageValueService.getLanguageAndName(
  //     objects.value.idlanguage,
  //     objects.value.name,
  //   );
  //   if (checkDuplicate != null) return null;

  //   let typeObj;
  //   if (obj.idpage == undefined || obj.idpage == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idpage, objects.type);
  //   }

  //   const valueObjToAdd: PageValueDto = new PageValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.name = objects.value.name;
  //   valueObjToAdd.idpage = typeObj.id;
  //   valueObjToAdd.content = objects.value.content;
  //   valueObjToAdd.descriptionmeta = objects.value.descriptionmeta;
  //   valueObjToAdd.keymeta = objects.value.keymeta;
  //   valueObjToAdd.title = objects.value.title;
  //   valueObjToAdd.url = objects.value.url;

  //   const valueObj = await this.pageValueService.save(valueObjToAdd);

  //   const result = this.toTypeResult(typeObj, valueObj);
  //   const rez = await this.pageValueService.findByIdAndPopulate(result.id);
  //   return rez;
  // }

  // toTypeResult(tObj: PageDto, vObj: PageValueDto): ResultPageDto {
  //   const result = new ResultPageDto();
  //   result.idlanguage = vObj.idlanguage;
  //   result.name = vObj.name;

  //   result.type = tObj.type;
  //   result.status = tObj.status;
  //   result.id = vObj.id;

  //   result.idattachment = tObj.idattachment;
  //   result.idgallery = tObj.idgallery;

  //   result.idvideo = tObj.idvideo;
  //   result.idpage = tObj.id;

  //   result.content = vObj.content;
  //   result.descriptionmeta = vObj.descriptionmeta;
  //   result.keymeta = vObj.keymeta;
  //   result.title = vObj.title;
  //   result.url = vObj.url;

  //   return result;
  // }

  // fromPopulateToResult(obj: PagePopulateDto): ResultPageDto {
  //   const result: ResultPageDto = new ResultPageDto();

  //   result.id = obj.id;
  //   result.type = obj.typeobject.type;
  //   result.status = obj.typeobject.status;
  //   result.idlanguage = obj.language.id;
  //   result.idpage = obj.typeobject.id;
  //   result.language = obj.language.name;
  //   result.name = obj.name;
  //   result.url = obj.url;
  //   result.title = obj.title;
  //   result.keymeta = obj.keymeta;
  //   result.descriptionmeta = obj.descriptionmeta;
  //   result.content = obj.content;
  //   result.idgallery = obj.typeobject.idgallery;
  //   result.idattachment = obj.typeobject.idattachment;
  //   result.idvideo = obj.typeobject.idvideo;

  //   return result;
  // }

  // async add(postObj: object): Promise<PageDto> {
  //   const obj = await this.pageRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj = await this.pageValueService.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idpage;
  //   const obj = await this.pageRepository.delete(id);
  //   await this.pageValueService.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<PageDto> {
  //   const obj = await this.pageRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // prepareToUpdate(obj: ResultPageDto): LinkPageDto {
  //   const pageDto = new LinkPageDto();

  //   const objectType = new PageDto();
  //   objectType.type = obj.type;
  //   objectType.status = obj.status;

  //   objectType.idattachment = obj.idattachment;
  //   objectType.idgallery = obj.idgallery;
  //   objectType.idvideo = obj.idvideo;
  //   pageDto.type = objectType;

  //   const objectValue = new PageValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   objectValue.content = obj.content;
  //   objectValue.descriptionmeta = obj.descriptionmeta;
  //   objectValue.keymeta = obj.keymeta;
  //   objectValue.title = obj.title;
  //   objectValue.url = obj.url;

  //   pageDto.value = objectValue;

  //   return pageDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultPageDto,
  // ): Promise<ResultPageDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.pageValueService.save(objects.value, id);

  //   const objT = await this.update(obj.idpage, objects.type);

  //   if (objV == null || objT == null) return null;
  //   // const result = this.toTypeResult(objT,objV);
  //   const rez = await this.pageValueService.findByIdAndPopulate(id);
  //   return rez;
  // }
}