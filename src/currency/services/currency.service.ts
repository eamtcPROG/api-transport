import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CurrencyRepository } from '../repositories/currency.repository';
import { CurrencyDto } from '../dto/currency.dto';
import { Currency } from '../schemas/currency.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultCurrencyDto } from '../dto/resultcurrency.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';


import { CurrencyValueDto } from '../dto/currencyvalue.dto';
import { CurrencyValueService } from './currencyvalue.service';
import { LinkCurrencyDto } from '../dto/linkcurrency.dto';
import { PostCurrencyDto } from '../dto/postcurrency.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { CurrencyPopulateDto } from '../dto/currencypopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class CurrencyService
  extends GeneralService<CurrencyRepository, CurrencyValueService>
  implements IService {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => CurrencyValueService))
    private readonly currencyValueService: CurrencyValueService,
  ) {
    super(currencyRepository, currencyValueService);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['identifier', 'numcode']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new CurrencyDto();

    rez.id = this.currencyRepository.getParsedIdStr(obj._id);
    
    if (obj.hasOwnProperty('ordercriteria')) rez.ordercriteria = obj.ordercriteria;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('numcode')) rez.numcode = obj.numcode;
    if (obj.hasOwnProperty('identifier')) rez.identifier = obj.identifier;

    if (obj.hasOwnProperty('allvalues')) rez.allvalues = obj.allvalues;
    if (obj.hasOwnProperty('_values'))
    {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('name')) rez.name = obj._values.name;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;
    }
    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: CurrencyDto = new CurrencyDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('ordercriteria')) obj.ordercriteria = postObj.ordercriteria;
    if (postObj.hasOwnProperty('numcode')) obj.numcode = postObj.numcode;
    if (postObj.hasOwnProperty('identifier')) obj.identifier = postObj.identifier;
    

    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new CurrencyDto();
  //   rez.id = obj._id;
  //   rez.status = obj.status;
  //   rez.ordercriteria = obj.ordercriteria;

  //   rez.numcode = obj.numcode;
  //   rez.identifier = obj.identifier;

  //   return rez;
  // }

  // prepareToAdd(obj: PostCurrencyDto): LinkCurrencyDto {
  //   const linkCurrencyDto = new LinkCurrencyDto();

  //   const objectType = new CurrencyDto();

  //   objectType.status = obj.status;
  //   objectType.ordercriteria = obj.ordercriteria;

  //   objectType.numcode = obj.numcode;
  //   objectType.identifier = obj.identifier;

  //   linkCurrencyDto.type = objectType;

  //   const objectValue = new CurrencyValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   linkCurrencyDto.value = objectValue;
  //   return linkCurrencyDto;
  // }

  // async addTypeWithValue(obj: PostCurrencyDto): Promise<ResultCurrencyDto> {
  //   const objects = this.prepareToAdd(obj);

  //   let typeObj;
  //   if (obj.idcurrency == undefined || obj.idcurrency == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idcurrency, objects.type);
  //   }

  //   const valueObjToAdd: CurrencyValueDto = new CurrencyValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.idcurrency = typeObj.id;
  //   valueObjToAdd.name = objects.value.name;

  //   const valueObj = await this.currencyValueService.save(valueObjToAdd);

  //   const result = this.toTypeResult(typeObj, valueObj);
  //   const rez = await this.currencyValueService.findByIdAndPopulate(result.id);
  //   return rez;
  // }

  // toTypeResult(tObj: CurrencyDto, vObj: CurrencyValueDto): ResultCurrencyDto {
  //   const result: ResultCurrencyDto = new ResultCurrencyDto();

  //   result.idlanguage = vObj.idlanguage;
  //   result.name = vObj.name;

  //   result.status = tObj.status;
  //   result.id = vObj.id;
  //   result.idcurrency = tObj.id;

  //   result.ordercriteria = tObj.ordercriteria;

  //   result.numcode = tObj.numcode;
  //   result.identifier = tObj.identifier;

  //   return result;
  // }

  // fromPopulateToResult(obj: CurrencyPopulateDto): ResultCurrencyDto {
  //   const result: ResultCurrencyDto = new ResultCurrencyDto();

  //   result.id = obj.id;

  //   result.name = obj.name;
  //   result.idlanguage = obj.language.id;
  //   result.language = obj.language.name;
  //   result.status = obj.typeobject.status;

  //   result.idcurrency = obj.typeobject.id;

  //   result.ordercriteria = obj.typeobject.ordercriteria;
  //   result.numcode = obj.typeobject.numcode;
  //   result.identifier = obj.typeobject.identifier;

  //   return result;
  // }

  // // UNVERIFIED

  // async add(postObj: object): Promise<CurrencyDto> {
  //   const obj = await this.currencyRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj = await this.currencyValueService.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idcurrency;
  //   const obj = await this.currencyRepository.delete(id);
  //   await this.currencyValueService.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<CurrencyDto> {
  //   const obj = await this.currencyRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // prepareToUpdate(obj: ResultCurrencyDto): LinkCurrencyDto {
  //   const currencyDto = new LinkCurrencyDto();

  //   const objectType = new CurrencyDto();

  //   objectType.status = obj.status;
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.numcode = obj.numcode;
  //   objectType.identifier = obj.identifier;

  //   currencyDto.type = objectType;

  //   const objectValue = new CurrencyValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.idcurrency = obj.idcurrency;
  //   objectValue.name = obj.name;

  //   currencyDto.value = objectValue;

  //   return currencyDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultCurrencyDto,
  // ): Promise<ResultCurrencyDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.currencyValueService.save(objects.value, id);

  //   const objT = await this.update(obj.idcurrency, objects.type);

  //   if (objV == null || objT == null) return null;
  //   // const result = this.toTypeResult(objT, objV);
  //   const rez = await this.currencyValueService.findByIdAndPopulate(id);
  //   return rez;
  // }
}