import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeGenderValueRepository } from '../repositories/typegendervalue.repository';
import { TypeGenderValueDto } from '../dto/typegendervalue.dto';
import { TypePopulateDto } from '../dto/typepopulate.dto';

import { TypeGenderValue } from '../schemas/typegendervalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostGeneralNomenclatureValueDto } from '../dto/postgeneralnomenclaturevalue.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';

import { RepositoryValueInterface } from '../interfaces/repositoryvalue.interface';
import { ServiceInterface } from '../interfaces/service.interface';
import GeneralNomenclatureValueDto from '../dto/generalnomenclaturevalue.dto';
import { GeneralNomenclatureService } from './generalnomenclature.service';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export abstract class GeneralNomenclatureValueService<
  Repo extends RepositoryValueInterface,
  Service extends ServiceInterface,
>
  extends GeneralService<Repo, null>
  implements IService {
  constructor(
    protected readonly repository: Repo,
    protected readonly service: Service,
    protected readonly languageService: LanguageService,
  ) {
    super(repository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idtype']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new GeneralNomenclatureValueDto();

    rez.id = this.repository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idtype'))
      rez.idtype = this.repository.getParsedIdStr(obj.idtype);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.repository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;

    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto {
    if (!postObj.hasOwnProperty('idlanguage')) return null;

    const obj: GeneralNomenclatureValueDto = new GeneralNomenclatureValueDto();
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    obj.idtype = id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;

    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: GeneralNomenclatureValueDto = new GeneralNomenclatureValueDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idtype')) obj.idtype = postObj.idtype;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    return obj;
  }

  // toDto(obj: any) {
  //   const rez = new GeneralNomenclatureValueDto();
  //   rez.id = obj._id;
  //   rez.idlanguage = obj.idlanguage;
  //   rez.idtype = obj.idtype;
  //   rez.name = obj.name;

  //   return rez;
  // }

  // // UNVERIFIED

  // async add(
  //   postObj: PostGeneralNomenclatureValueDto,
  // ): Promise<GeneralNomenclatureValueDto> {
  //   const obj = await this.repository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.repository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(
  //   id: string,
  //   putObj: PostGeneralNomenclatureValueDto,
  // ): Promise<GeneralNomenclatureValueDto> {
  //   const obj = await this.repository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(
  //   input: string,
  //   name: string,
  // ): Promise<PostGeneralNomenclatureValueDto> {
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

  // async getAllPopulate(options: RequestListDTO): Promise<TypePopulateDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idtype', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.repository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<TypePopulateDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idtype', 'idlanguage'];

  //   const obj = await this.repository.findById(id, requestPopulateDTO);
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez = new TypePopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = this.service.toDto(obj.idtype);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.name = obj.name;

  //   return rez;
  // }

  // async toTypeValuePopulateDtoArray(objs: TypePopulateDto[]) {
  //   const rez = new Array<TypePopulateDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.repository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}