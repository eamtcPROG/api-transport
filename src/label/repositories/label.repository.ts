import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Label } from 'src/label/schemas/label.schema';
import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LabelValueRepository } from './labelvalue.repository';
import { ConfigService } from '@nestjs/config';
import Ischema from 'src/app/interfaces/ischema.interface';
import { LanguageRepository } from 'src/language/repositories/language.repository';

@Injectable()
export class LabelRepository extends GeneralRepository implements IRepository {
  constructor(
    @InjectModel('Label')
    private readonly labelModel: Model<Label>,

    @Inject(forwardRef(() => LabelValueRepository))
    private readonly valueRepository: LabelValueRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(labelModel);
    this.setMainPart('Label');
    this.setConfigService(this.configService);
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

  async populateObj(obj: any, populate?: RequestPopulateDTO, idLanguage?:string): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;
    
    if(idLanguage == undefined) obj = await this.populateObjValues(this.valueRepository, obj, populate, 'idlabel');
    else obj = await this.populateObjValues(this.valueRepository, obj, populate, 'idlabel', idLanguage);
    


    // if (populate.populates.indexOf('allvalues') !== -1) {

    //   const tF = new RequestFilterDTO();
    //   tF.field = 'iduser';
    //   tF.values = [obj._id];
    //   const tInfoUR = new RequestListDTO();
    //   tInfoUR.filters = [tF];
    //   tInfoUR.populate = populate;
    //   tInfoUR.page = 1;
    //   tInfoUR.onpage = 99999999;

    //   obj.userroles = await this.userRoleRepository.findAll(tInfoUR);
    // }

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
            tOr.push({ identifier: re });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
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
      if (filter.field == 'identifier') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            tOr.push({ identifier: value });
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
            tOr.push({ type: v });
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
