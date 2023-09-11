import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { CurrencyRate } from '../schemas/currencyrate.schema';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import { CurrencyRepository } from './currency.repository';


@Injectable()
export class CurrencyRateRepository
  extends GeneralRepository
  implements IRepository {
  constructor(
    @InjectModel('CurrencyRate')
    private readonly currencyRateModel: Model<CurrencyRate>,

    @Inject(forwardRef(() => CurrencyRepository))
    private readonly currencyRepository: CurrencyRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,


  ) {
    super();
    this.setModel(currencyRateModel);
    this.setMainPart('CurrencyRate');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    if (populate.populates.includes('fromidcurrency') && obj.fromidcurrency)
      obj.fromidcurrencyobj = await this.currencyRepository.findById(obj.fromidcurrency, populate);

    if (populate.populates.includes('toidcurrency') && obj.toidcurrency)
      obj.toidcurrencyobj = await this.currencyRepository.findById(obj.toidcurrency, populate);

    return obj;
  }

  processOptionForList(info?: RequestListDTO): object {
    if (info == null) return {};

    if (info.filters == null) return {};
    const rez: any = {};

    const tAnd = [];
    for (const filter of info.filters) {
      if (filter.field == 'fromidcurrency') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            tOr.push({ fromidcurrency: this.getParsedId(value) });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }

      if (filter.field == 'toidcurrency') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            tOr.push({ toidcurrency: this.getParsedId(value) });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
    }

    if (tAnd.length) {
      rez.$and = tAnd;
    }

    return rez;
  }
}
