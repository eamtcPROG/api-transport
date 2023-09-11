import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LanguageRepository } from '../repositories/language.repository';
import { LanguageDto } from '../dto/language.dto';
import { Language } from '../schemas/language.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostLanguageDto } from '../dto/postlanguage.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import { PutLanguageDto } from '../dto/putlanguage.dto';
import * as crypto from 'crypto';
import { ToolsDate } from 'src/app/tools/tooldate';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import RequestSortCriteriaDTO from 'src/app/dto/requestsortcriteria.dto';

@Injectable()
export class LanguageService
  extends GeneralService<LanguageRepository, null>
  implements IService
{
  constructor(
    private readonly languageRepository: LanguageRepository,
    protected readonly configService: ConfigService,
  ) {
    super(languageRepository);
  }

  getKeys(): any[] {
    const rez = [];
    // rez.push([]);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new LanguageDto();
    rez.id = this.languageRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('cod2')) rez.cod2 = obj.cod2;
    if (obj.hasOwnProperty('cod3')) rez.cod3 = obj.cod3;
    if (obj.hasOwnProperty('ordercriteria')) rez.ordercriteria = obj.ordercriteria;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('hmtlcode')) rez.hmtlcode = obj.hmtlcode;
    if (obj.hasOwnProperty('updatedate')) rez.updatedate = obj.updatedate;

    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: LanguageDto = new LanguageDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('cod2')) obj.cod2 = postObj.cod2;
    if (postObj.hasOwnProperty('cod3')) obj.cod3 = postObj.cod3;
    if (postObj.hasOwnProperty('ordercriteria')) obj.ordercriteria = postObj.ordercriteria;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('hmtlcode')) obj.hmtlcode = postObj.hmtlcode;
    obj.updatedate = ToolsDate.getTimeStamp();
    
    
    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new LanguageDto();
  //   rez.id = obj._id;
  //   rez.name = obj.name;
  //   rez.cod2 = obj.cod2;
  //   rez.cod3 = obj.cod3;
  //   rez.ordercriteria = obj.ordercriteria;
  //   rez.status = obj.status;
  //   rez.hmtlcode = obj.hmtlcode;

  //   return rez;
  // }

  // UNVERIFIED
  // prepareObjectToAdd(obj: PostLanguageDto): LanguageDto {
  //   const objToSave: LanguageDto = new LanguageDto();
  //   objToSave.name = obj.name;
  //   objToSave.cod2 = obj.cod2;
  //   objToSave.cod3 = obj.cod3;
  //   objToSave.ordercriteria = obj.ordercriteria;
  //   objToSave.status = obj.status;
  //   objToSave.hmtlcode = obj.hmtlcode;
  //   objToSave.updatedate = ToolsDate.getTimeStamp();
  //   return objToSave;
  // }
  // async add(postObj: PostLanguageDto): Promise<LanguageDto> {
  //   const objToAdd = this.prepareObjectToAdd(postObj);
  //   const obj = await this.languageRepository.save(objToAdd);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.languageRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: PutLanguageDto): Promise<LanguageDto> {
  //   putObj.updatedate = ToolsDate.getTimeStamp();
  //   const obj = await this.languageRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getHash(): Promise<object> {
  //   const rLDTO = new RequestListDTO();
  //   rLDTO.page = 1;
  //   rLDTO.onpage = 999999;
  //   rLDTO.filters = [];
  //   const total = await this.languageRepository.findCount(rLDTO);

  //   let lastId = '';
  //   let lastValue = -1;

  //   if (total) {
  //     const lastEntryById: any = await this.findOneSortBy('_id');
  //     lastId = lastEntryById != null ? lastEntryById.id : '';

  //     const lastEntryByValue:any = await this.findOneSortBy('updatedate');
  //     lastValue = lastEntryByValue != null ? lastEntryByValue.updatedate : -1;
  //   }
  //   const hash = crypto
  //     .createHash('md5')
  //     .update(`${total}_${lastId}_${lastValue}`)
  //     .digest('hex');
  //   const obj = {
  //     hash: hash,
  //   };
  //   return obj;
  
  // }

  async getHash(): Promise<object> {
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 1;
    rLDTO.filters = [];

    const sort: RequestSortCriteriaDTO = new RequestSortCriteriaDTO();
    sort.field = 'updatedate';
    sort.asc = false;

    rLDTO.sortcriteria = [];
    rLDTO.sortcriteria.push(sort);

    const total = await this.languageRepository.findCount(rLDTO);
    const all = await this.languageRepository.findAll(rLDTO);
    
    let lastId = '';
    let lastUpdateDate = -1;

    if (all.length)
    {
      const obj = all[0];
      lastId = obj.id;
      lastUpdateDate = obj.updatedate;
    }

    const hash = crypto.createHash('md5').update(`${total}_${lastId}_${lastUpdateDate}`).digest('hex');

    return {hash: hash};
  }

  async findOneSortBy(input: string): Promise<Idto> {
    const obj = await this.languageRepository.findOneSortBy(input);
    if (obj == null) return null;
    return this.toDto(obj);
  }
}
