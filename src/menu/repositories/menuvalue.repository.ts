import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { MenuValue } from '../schemas/menuvalue.schema';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import { LanguageRepository } from 'src/language/repositories/language.repository';

@Injectable()
export class MenuValueRepository
  extends GeneralRepository
  implements IRepository
{
  constructor(
    @InjectModel('MenuValue')
    private readonly menuValueModel: Model<MenuValue>,
    private readonly languageRepository: LanguageRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(menuValueModel);
    this.setMainPart('MenuValue');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;
    
    if (populate.populates.includes('idlanguage') && obj.idlanguage){
      obj.language = await this.languageRepository.findById(this.getParsedIdStr(obj.idlanguage));
    }
    return obj;
  }

  processOptionForList(info?: RequestListDTO): object {
    if (info == null) return {};

    if (info.filters == null) return {};
    const rez: any = {};

    const tAnd = [];
    for (const filter of info.filters) {
      if (filter.field == 'search') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            const re = this.getParsedRegExp(value);
            tOr.push({ name: re });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'idlanguage') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            tOr.push({ idlanguage: this.getParsedId(value) });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'name') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            tOr.push({ name: value });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }

      if (filter.field == 'idmenu') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            tOr.push({ idmenu: this.getParsedId(value) });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      //
      // if (filter.field == 'type') {
      //   const tOr = [];
      //   const values = filter.values;
      //   if (Array.isArray(values)) {
      //     for (const value of values) {
      //       if (!value) continue;
      //       tOr.push({ '$nomenclature.type': value });
      //     }
      //   }
      //   if (tOr.length) {
      //     tAnd.push({ $or: tOr });
      //   }
      // }
    }

    if (tAnd.length) {
      rez.$and = tAnd;
    }

    return rez;
  }
  async deleteByIdType(id: string): Promise<any> {
    return await this.menuValueModel.deleteOne({ idmenu: id });
  }
  async findOneSortBy(input: string): Promise<any> {
    return await this.menuValueModel.findOne().sort(input).exec();
  }
}
