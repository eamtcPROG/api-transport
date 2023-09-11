import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CurrencyValueRepository } from '../repositories/currencyvalue.repository';
import { CurrencyValueDto } from '../dto/currencyvalue.dto';
import { CurrencyPopulateDto } from '../dto/currencypopulate.dto';

import { CurrencyValue } from '../schemas/currencyvalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';

import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { CurrencyService } from './currency.service';
import { ResultCurrencyDto } from '../dto/resultcurrency.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class CurrencyValueService
  extends GeneralService<CurrencyValueRepository, null>
  implements IService
{
  constructor(
    private readonly currencyValueRepository: CurrencyValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => CurrencyService))
    private readonly currencyService: CurrencyService,
  ) {
    super(currencyValueRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idcurrency']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new CurrencyValueDto();

    rez.id = this.currencyValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idcurrency'))
      rez.idcurrency = this.currencyValueRepository.getParsedIdStr(obj.idcurrency);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.currencyValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;

    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto{
    if (!postObj.idlanguage) return null;

    const obj: CurrencyValueDto = new CurrencyValueDto();
    if (postObj.idlanguage) obj.idlanguage = postObj.idlanguage;
    obj.idcurrency = id;
    if (postObj.name) obj.name = postObj.name;
    
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: CurrencyValueDto = new CurrencyValueDto();
    if (postObj.id) obj.id = postObj.id;
    if (postObj.idlanguage) obj.idlanguage = postObj.idlanguage;
    if (postObj.idcurrency) obj.idcurrency = postObj.idcurrency;
    if (postObj.name) obj.name = postObj.name;
    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new CurrencyValueDto();
  //   rez.id = obj._id;
  //   rez.idlanguage = obj.idlanguage;
  //   rez.idcurrency = obj.idcurrency;
  //   rez.name = obj.name;

  //   return rez;
  // }

  // // UNVERIFIED

  // async add(postObj: CurrencyValueDto): Promise<CurrencyValueDto> {
  //   const obj = await this.currencyValueRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.currencyValueRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(
  //   id: string,
  //   putObj: CurrencyValueDto,
  // ): Promise<CurrencyValueDto> {
  //   const obj = await this.currencyValueRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(
  //   input: string,
  //   name: string,
  // ): Promise<CurrencyValueDto> {
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

  // async getAllPopulate(options: RequestListDTO): Promise<ResultCurrencyDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idcurrency', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.currencyValueRepository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<ResultCurrencyDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idcurrency', 'idlanguage'];

  //   const obj = await this.currencyValueRepository.findById(
  //     id,
  //     requestPopulateDTO,
  //   );
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez = new CurrencyPopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = await this.currencyService.getById(obj.idcurrency);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.name = obj.name;

  //   return this.currencyService.fromPopulateToResult(rez);
  // }

  // async toTypeValuePopulateDtoArray(objs: CurrencyPopulateDto[]) {
  //   const rez = new Array<ResultCurrencyDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.currencyValueRepository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}