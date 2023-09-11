import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { Page } from '../schemas/page.schema';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import Ischema from 'src/app/interfaces/ischema.interface';
import { PageValueRepository } from './pagevalue.repository';
import { MediaService } from 'src/app/services/media.service';
import { CommonTools } from 'src/app/tools/commontools';

@Injectable()
export class PageRepository extends GeneralRepository implements IRepository {
  constructor(
    @InjectModel('Page')
    private readonly pageModel: Model<Page>,

    @Inject(forwardRef(() => PageValueRepository))
    private readonly valueRepository: PageValueRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,

    private readonly mediaService: MediaService,
  ) {
    super();
    this.setModel(pageModel);
    this.setMainPart('Page');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO, idLanguage?: string): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    if (idLanguage == undefined) obj = await this.populateObjValues(this.valueRepository, obj, populate, 'idpage');
    else obj = await this.populateObjValues(this.valueRepository, obj, populate, 'idpage', idLanguage);

    obj = await this.mediaService.populateObjWithMedia(obj, populate);

    CommonTools.prepareFullUrl(obj, 'page');

    return obj;
  }

  processAgregateForList(
    _model: Model<Ischema>,
    options: object,
    info?: RequestListDTO,
    forCount?: boolean,
  ): any {

    const tAgregate = this.processAgregateForListValues(
      info
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
    }

    if (tAnd.length) {
      rez.$and = tAnd;
    }

    return rez;
  }
}
