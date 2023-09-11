import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MenuRepository } from '../repositories/menu.repository';
import { MenuDto } from '../dto/menu.dto';
import { Menu } from '../schemas/menu.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultMenuDto } from '../dto/resultmenu.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';


import { MenuValueDto } from '../dto/menuvalue.dto';
import { MenuValueService } from './menuvalue.service';
import { LinkMenuDto } from '../dto/linkmenu.dto';
import { PostMenuDto } from '../dto/postmenu.dto';
import { MenuPopulateDto } from '../dto/menupopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import { UrlRelationService } from 'src/app/services/urlrelation.service';


@Injectable()
export class MenuService
  extends GeneralService<MenuRepository, MenuValueService>
  implements IService
{
  constructor(
    private readonly menuRepository: MenuRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => MenuValueService))
    private readonly menuValueService: MenuValueService,

    @Inject(forwardRef(() => UrlRelationService))
    private readonly urlRelationService: UrlRelationService,
  ) {
    super(menuRepository, menuValueService);
  }

  getKeys(): any[] {
    const rez = [];
    
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new MenuDto();

    rez.id = this.menuRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idpage')) rez.idpage = this.menuRepository.getParsedIdStr(obj.idpage);
    if (obj.hasOwnProperty('section')) rez.section = obj.section;
    if (obj.hasOwnProperty('ordercriteria')) rez.ordercriteria = obj.ordercriteria;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('hasurl')) rez.hasurl = obj.hasurl;
    if (obj.hasOwnProperty('url')) rez.url = obj.url;
    if (obj.hasOwnProperty('idparent')) rez.idparent = obj.idparent;
    if (obj.hasOwnProperty('page')) rez.page = obj.page;
    if (obj.hasOwnProperty('allvalues')) rez.allvalues = obj.allvalues;
    if (obj.hasOwnProperty('_values'))
    {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('name')) rez.name = obj._values.name;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;

    }
    if(obj.hasOwnProperty('fullurl')) rez.fullurl = obj.fullurl;
    if(obj.hasOwnProperty('haschildren')) rez.haschildren = obj.haschildren;
    
    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: MenuDto = new MenuDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idpage')) obj.idpage = postObj.idpage;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('section')) obj.section = postObj.section;
    if (postObj.hasOwnProperty('hasurl')) obj.hasurl = postObj.hasurl;
    if (postObj.hasOwnProperty('url')) obj.url = postObj.url;
    if (postObj.hasOwnProperty('ordercriteria')) obj.ordercriteria = postObj.ordercriteria;
    if (postObj.hasOwnProperty('idparent')) obj.idparent = postObj.idparent;
    return obj;
  }


  async saveOtherData (obj: any, postObj: any) {
    if(obj.hasOwnProperty('id') && obj.hasOwnProperty('url')) await this.urlRelationService.registerUrlRelation('menu',obj.id.toString(), obj.url);
  }

  // toDto(obj: any): Idto {
  //   const rez = new MenuDto();
  //   rez.id = obj._id;
  //   rez.status = obj.status;
  //   rez.section = obj.section;
  //   rez.idpage = obj.idpage;
  //   rez.url = obj.url;
  //   rez.ordercriteria = obj.ordercriteria;
  //   rez.hasurl = obj.hasurl;
  //   rez.idparent = obj.idparent;

  //   return rez;
  // }

  // // UNVERIFIED

  // prepareToAdd(obj: PostMenuDto): LinkMenuDto {
  //   const linkMenuDto = new LinkMenuDto();

  //   const objectType = new MenuDto();

  //   objectType.status = obj.status;
  //   objectType.section = obj.section;
  //   objectType.idpage = obj.hasurl ? null : obj.idpage;
  //   objectType.url = obj.hasurl ? obj.url : '';
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.hasurl = obj.hasurl;
  //   objectType.idparent = obj.idparent != undefined ? obj.idparent : '';

  //   linkMenuDto.type = objectType;

  //   const objectValue = new MenuValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   linkMenuDto.value = objectValue;
  //   return linkMenuDto;
  // }

  // async addTypeWithValue(obj: PostMenuDto): Promise<ResultMenuDto> {
  //   const objects = this.prepareToAdd(obj);
  //   // const checkDuplicate = await this.menuValueService.getLanguageAndName(objects.value.idlanguage, objects.value.name);
  //   // if (checkDuplicate != null) return null;

  //   let typeObj;
  //   if (obj.idmenu == undefined || obj.idmenu == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idmenu, objects.type);
  //   }

  //   const valueObjToAdd: MenuValueDto = new MenuValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.name = objects.value.name;
  //   valueObjToAdd.idmenu = typeObj.id;

  //   const valueObj = await this.menuValueService.save(valueObjToAdd);

  //   const result = this.toTypeResult(typeObj, valueObj);
  //   const rez = await this.menuValueService.findByIdAndPopulate(result.id);
  //   return rez;
  // }

  // toTypeResult(tObj: MenuDto, vObj: MenuValueDto): ResultMenuDto {
  //   const result: ResultMenuDto = new ResultMenuDto();

  //   result.idlanguage = vObj.idlanguage;
  //   result.name = vObj.name;

  //   result.status = tObj.status;
  //   result.id = vObj.id;
  //   result.idmenu = tObj.id;
  //   result.section = tObj.section;
  //   result.idpage = tObj.idpage;
  //   result.url = tObj.url;
  //   result.ordercriteria = tObj.ordercriteria;
  //   result.hasurl = tObj.hasurl;
  //   result.idparent = tObj.idparent;

  //   return result;
  // }

  // fromPopulateToResult(obj: MenuPopulateDto): ResultMenuDto {
  //   const result: ResultMenuDto = new ResultMenuDto();

  //   result.id = obj.id;

  //   result.status = obj.typeobject.status;
  //   result.idlanguage = obj.language.id;
  //   result.idmenu = obj.typeobject.id;
  //   result.language = obj.language.name;
  //   result.name = obj.name;
  //   result.url = obj.typeobject.url;

  //   result.hasurl = obj.typeobject.hasurl;
  //   result.idparent = obj.typeobject.idparent;

  //   result.idpage = obj.typeobject.idpage;
  //   result.ordercriteria = obj.typeobject.ordercriteria;
  //   result.section = obj.typeobject.section;

  //   return result;
  // }

  // async add(postObj: object): Promise<MenuDto> {
  //   const obj = await this.menuRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj = await this.menuValueService.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idmenu;
  //   const obj = await this.menuRepository.delete(id);
  //   await this.menuValueService.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<MenuDto> {
  //   const obj = await this.menuRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // prepareToUpdate(obj: ResultMenuDto): LinkMenuDto {
  //   const menuDto = new LinkMenuDto();

  //   const objectType = new MenuDto();

  //   objectType.status = obj.status;
  //   objectType.section = obj.section;
  //   objectType.idpage = obj.hasurl ? null : obj.idpage;
  //   objectType.url = obj.hasurl ? obj.url : '';
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.hasurl = obj.hasurl;
  //   objectType.idparent = obj.idparent != undefined ? obj.idparent : '';

  //   menuDto.type = objectType;

  //   const objectValue = new MenuValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;
  //   objectValue.idmenu = obj.idmenu;

  //   menuDto.value = objectValue;

  //   return menuDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultMenuDto,
  // ): Promise<ResultMenuDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.menuValueService.save(objects.value, id);

  //   const objT = await this.update(obj.idmenu, objects.type);

  //   if (objV == null || objT == null) return null;
  //   // const result = this.toTypeResult(objT, objV);
  //   const rez = await this.menuValueService.findByIdAndPopulate(id);
  //   return rez;
  // }
}