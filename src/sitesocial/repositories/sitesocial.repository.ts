import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SiteSocial } from '../schemas/sitesocial.schema';
import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import { TypeSocialRepository } from 'src/nomenclature/repositories/typesocial.repository';

@Injectable()
export class SiteSocialRepository extends GeneralRepository implements IRepository {
  constructor(
    @InjectModel('SiteSocial')
    private readonly siteSocialModel: Model<SiteSocial>,

    @Inject(forwardRef(() => TypeSocialRepository))
    private readonly typeSocialRepository: TypeSocialRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(siteSocialModel);
    this.setMainPart('SiteSocial');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;
    if (populate.populates.includes('idtypesocial') && obj.idtypesocial)
      obj.typesocial = await this.typeSocialRepository.findById(obj.idtypesocial, populate);

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
            tOr.push({ link: re });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'status') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            const v = parseInt(value);
            tOr.push({ status: v });
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
