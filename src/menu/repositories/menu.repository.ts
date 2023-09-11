import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { Menu } from '../schemas/menu.schema';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import Ischema from 'src/app/interfaces/ischema.interface';
import { MenuValueRepository } from './menuvalue.repository';
import { PageRepository } from 'src/page/repositories/page.repository';

@Injectable()
export class MenuRepository extends GeneralRepository implements IRepository {
  constructor(
    @InjectModel('Menu')
    private readonly menuModel: Model<Menu>,

    @Inject(forwardRef(() => MenuValueRepository))
    private readonly valueRepository: MenuValueRepository,

    private readonly pageRepository: PageRepository,
    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(menuModel);
    this.setMainPart('Menu');
    this.setConfigService(this.configService);
  }
  processAgregateForList(
    _model: Model<Ischema>,
    options: object,
    info?: RequestListDTO,
    forCount?: boolean,
  ): any {
    const tAgregate = this.processAgregateForListValues(info);

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
  async populateObj(
    obj: any,
    populate?: RequestPopulateDTO,
    idLanguage?: string,
  ): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (!populate.populates) return obj;

    if (idLanguage == undefined)
      obj = await this.populateObjValues(
        this.valueRepository,
        obj,
        populate,
        'idmenu',
      );
    else
      obj = await this.populateObjValues(
        this.valueRepository,
        obj,
        populate,
        'idmenu',
        idLanguage,
      );
    if (populate.populates.includes('idpage') && obj.idpage) {
      
      const idPage: string = this.getParsedId(obj.idpage).toString();
      const p = await this.pageRepository.findById(idPage, populate);

      if (p != null)
        obj.page = await this.pageRepository.findById(idPage, populate);
    }


    if (obj.hasOwnProperty('hasurl') || obj.hasOwnProperty('idpage')) {
    
      if (obj.hasurl || obj.idpage) {
        if (obj.hasOwnProperty('page')) {
          if (obj.page.hasOwnProperty('fullurl')) {
            obj.fullurl = obj.page.fullurl;
          }
        } else {
          if (obj.hasOwnProperty('url')) {
            obj.fullurl = obj.url;
          }
        }
      }
    }

    if (!obj.hasOwnProperty('fullurl')) obj.fullurl = '';

    obj = await this.prepareHasChildren(obj);
    
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
      if (filter.field == 'section') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            const v = parseInt(value);
            tOr.push({ section: v });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'idparent') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            tOr.push({ idparent: value });
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
