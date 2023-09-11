import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MenuValueRepository } from '../repositories/menuvalue.repository';
import { MenuValueDto } from '../dto/menuvalue.dto';
import { MenuPopulateDto } from '../dto/menupopulate.dto';

import { MenuValue } from '../schemas/menuvalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';

import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { MenuService } from './menu.service';
import { ResultMenuDto } from '../dto/resultmenu.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class MenuValueService
  extends GeneralService<MenuValueRepository, null>
  implements IService
{
  constructor(
    private readonly menuValueRepository: MenuValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => MenuService))
    private readonly menuService: MenuService,
  ) {
    super(menuValueRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idmenu']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new MenuValueDto();

    rez.id = this.menuValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idmenu'))
      rez.idmenu = this.menuValueRepository.getParsedIdStr(obj.idmenu);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.menuValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;

    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto{
    if (!postObj.hasOwnProperty('idlanguage')) return null;

    const obj: MenuValueDto = new MenuValueDto();
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    obj.idmenu = id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: MenuValueDto = new MenuValueDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idmenu')) obj.idmenu = postObj.idmenu;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new MenuValueDto();
  //   rez.id = obj._id;
  //   rez.idlanguage = obj.idlanguage;
  //   rez.idmenu = obj.idmenu;
  //   rez.name = obj.name;

  //   return rez;
  // }

  // // UNVERIFIED

  // async add(postObj: MenuValueDto): Promise<MenuValueDto> {
  //   const obj = await this.menuValueRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.menuValueRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: MenuValueDto): Promise<MenuValueDto> {
  //   const obj = await this.menuValueRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(input: string, name: string): Promise<MenuValueDto> {
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

  // async getAllPopulate(options: RequestListDTO): Promise<ResultMenuDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idmenu', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.menuValueRepository.findAll(options);
  //   console.log(objs);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<ResultMenuDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idmenu', 'idlanguage'];

  //   const obj = await this.menuValueRepository.findById(id, requestPopulateDTO);
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez = new MenuPopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = await this.menuService.getById(obj.idmenu);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.name = obj.name;

  //   return this.menuService.fromPopulateToResult(rez);
  // }

  // async toTypeValuePopulateDtoArray(objs: MenuPopulateDto[]) {
  //   const rez = new Array<ResultMenuDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.menuValueRepository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}