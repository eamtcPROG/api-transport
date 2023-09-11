import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CurrencyRateRepository } from '../repositories/currencyrate.repository';
import { CurrencyRateDto } from '../dto/currencyrate.dto';
import { CurrencyRate } from '../schemas/currencyrate.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostCurrencyRateDto } from '../dto/postcurrencyrate.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { CurrencyService } from './currency.service';
import { CurrencyRatePopulateDto } from '../dto/currencyratepopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class CurrencyRateService
  extends GeneralService<CurrencyRateRepository, null>
  implements IService
{
  constructor(
    private readonly currencyRateRepository: CurrencyRateRepository,
    protected readonly configService: ConfigService,
    private readonly currencyService: CurrencyService,
  ) {
    super(currencyRateRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['date', 'fromidcurrency', 'toidcurrency']);
    return rez;
  }
  
  toDto(obj: any): Idto {
    const rez = new CurrencyRateDto();

    rez.id = this.currencyRateRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('date')) rez.date = obj.date;
    if (obj.hasOwnProperty('fromidcurrency')) rez.fromidcurrency = obj.fromidcurrency;
    if (obj.hasOwnProperty('toidcurrency')) rez.toidcurrency = obj.toidcurrency;
    if (obj.hasOwnProperty('rate')) rez.rate = obj.rate;

    if(obj.hasOwnProperty('fromidcurrencyobj')) rez.fromidcurrencyobj = obj.fromidcurrencyobj;
    if(obj.hasOwnProperty('toidcurrencyobj')) rez.toidcurrencyobj = obj.toidcurrencyobj;
    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: CurrencyRateDto = new CurrencyRateDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('date')) obj.date = postObj.date;
    if (postObj.hasOwnProperty('fromidcurrency')) obj.fromidcurrency = postObj.fromidcurrency;
    if (postObj.hasOwnProperty('toidcurrency')) obj.toidcurrency = postObj.toidcurrency;
    if (postObj.hasOwnProperty('rate')) obj.rate = postObj.rate;
    
    return obj;
  }

  // UNVERIFIED

  async add(postObj: PostCurrencyRateDto): Promise<Idto> {
    const obj = await this.currencyRateRepository.save(postObj);

    return this.toDto(obj);
  }

  async delete(id: string): Promise<ResultDeleteDTO> {
    const obj = await this.currencyRateRepository.delete(id);

    if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
    return CommonTools.toDeleteResult(true);
  }

  async update(id: string, putObj: PostCurrencyRateDto): Promise<Idto> {
    const obj = await this.currencyRateRepository.update(id, putObj);
    if (obj.matchedCount === 0) return null;
    const objUpdated = await this.getById(id);

    return objUpdated;
  }

  async getAllPopulate(
    options: RequestListDTO,
  ): Promise<CurrencyRatePopulateDto[]> {
    const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
    requestPopulateDTO.populates = ['fromidcurrency', 'toidcurrency'];
    options.populate = requestPopulateDTO;

    const objs = await this.currencyRateRepository.findAll(options);
    if (objs == null) return null;
    return await this.toTypeValuePopulateDtoArray(objs);
  }
  async findByIdAndPopulate(id: string): Promise<Idto> {
    const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
    requestPopulateDTO.populates = ['fromidcurrency', 'toidcurrency'];

    const obj = await this.currencyRateRepository.findById(
      id,
      requestPopulateDTO,
    );
    if (obj == null) return null;

    return await this.toTypeValuePopulateDto(obj);
  }

  async toTypeValuePopulateDto(obj) {
    const rez = new CurrencyRatePopulateDto();
    rez.id = obj._id;
    rez.fromidentifier = obj.fromidcurrency.identifier;
    rez.toidentifier = obj.toidcurrency.identifier;
    rez.rate = obj.rate;
    rez.date = obj.date;
    rez.fromidcurrency = obj.fromidcurrency;
    rez.toidcurrency = obj.toidcurrency;
    return rez;
  }

  async toTypeValuePopulateDtoArray(objs: any) {
    const rez = new Array<CurrencyRatePopulateDto>();

    objs.map(async (item) => {
      const obj = await this.toTypeValuePopulateDto(item);
      rez.push(obj);
    });

    return rez;
  }
}
