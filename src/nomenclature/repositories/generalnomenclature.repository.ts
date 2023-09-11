import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { InjectModel } from '@nestjs/mongoose';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { RepositoryInterface } from '../interfaces/repository.interface';
import Ischema from 'src/app/interfaces/ischema.interface';
import { RepositoryValueInterface } from '../interfaces/repositoryvalue.interface';
import { CommonTools } from 'src/app/tools/commontools';
import { ConfigService } from '@nestjs/config';
import { MediaService } from 'src/app/services/media.service';


@Injectable()
export class GeneralNomenclatureRepository<Repo extends RepositoryValueInterface>
  extends GeneralRepository
  implements IRepository {
  constructor(
    protected readonly repository: Repo,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,

    protected readonly mediaService: MediaService,
  ) {
    super();
    this.setConfigService(this.configService);
  }
  // async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {
  //   if (!obj) return obj;

  //   obj = await this.populateObjValues(this.repository, obj, populate, 'idtype');

  //   if (!populate) return obj;
  //   if (!populate.populates) return obj;

  //   return obj;
  // }

  processAgregateForList(
    _model: Model<Ischema>,
    options: object,
    info?: RequestListDTO,
    forCount?: boolean,
  ): any {

    const tAgregate = this.processAgregateForListValues(
      info,
      'idtype',
    );

    tAgregate.push({
      $match: options,
    });

    if (forCount) {
      tAgregate.push({
        $count: 'total',
      });
    }

    return _model.aggregate(tAgregate);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO, expectedIdLanguage?: string): Promise<any> {
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    obj = await this.mediaService.populateObjWithMedia(obj, populate);

    const field = 'idtype';

    if (populate.populates.indexOf('typeobject') !== -1) {
      const tF = new RequestFilterDTO;
      tF.field = field;
      tF.values = [obj._id];
      const tInfoUR = new RequestListDTO();
      tInfoUR.filters = [tF];
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 99999999;

      obj.objectvalues = await this.repository.findAll(tInfoUR);
    }

    if (
      populate.populates.indexOf('values') !== -1 ||
      populate.populates.indexOf('_full') !== -1
    ) {
      let idLanguage = null;
      
      if (expectedIdLanguage == undefined) idLanguage = CommonTools.getHeader('idLanguage');
      else idLanguage = expectedIdLanguage;

      
      idLanguage = idLanguage ?? this.configService.get('config.default_language_id');
      
      let tInfoUR = new RequestListDTO();
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 1;
      tInfoUR.filters = [];

      let tF = new RequestFilterDTO();
      tF.field = field;
      tF.values = [obj._id];
      tInfoUR.filters.push(tF);

      tF = new RequestFilterDTO();
      tF.field = 'idlanguage';
      tF.values = [idLanguage];
      tInfoUR.filters.push(tF);

      let tall = await this.repository.findAll(tInfoUR);
      
      if (tall && tall.length) {
        obj._values = tall[0];
        if (obj._values.hasOwnProperty('name')) obj.name = obj._values.name;
      } else if (tall.length == 0 && expectedIdLanguage !== undefined) {
        obj._values = [{}];
      } else {
        tInfoUR = new RequestListDTO();
        tInfoUR.populate = populate;
        tInfoUR.page = 1;
        tInfoUR.onpage = 1;
        tInfoUR.filters = [];

        tF = new RequestFilterDTO();
        tF.field = field;
        tF.values = [obj._id];
        tInfoUR.filters.push(tF);

        tall = await this.repository.findAll(tInfoUR);

        if (tall && tall.length) {
          obj._values = tall[0];
          if (obj._values.hasOwnProperty('name')) obj.name = obj._values.name;
        }
      }


      
    }



    return obj;
  }

  processOptionForList(info?: RequestListDTO): object {
    if (info == null) return {};

    if (info.filters == null) return {};
    const rez: any = {};

    const tAnd = [];
    for (const filter of info.filters) {
      // if (filter.field == 'search') {
      //   const tOr = [];
      //   const values = filter.values;
      //   if (Array.isArray(values)) {
      //     for (const value of values) {
      //       const re = this.getParsedRegExp(value);
      //       tOr.push({ name: re });
      //     }
      //   }
      //   if (tOr.length) {
      //     tAnd.push({ $or: tOr });
      //   }
      // }
      if (filter.field == 'searchvalue') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            const re = this.getParsedRegExp(value);
            tOr.push({ 'values.name': re });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'type') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            const v = parseInt(value);
            tOr.push({ 'idtype.type': v });
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
