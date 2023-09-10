import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';
import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import Ischema from 'src/app/interfaces/ischema.interface';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { UserRoleRepository } from './userrole.repository';
import { UserSettingsRepository } from './usersettings.repository';
import { ConfigService } from '@nestjs/config';
import { UserSocialRepository } from './usersocial.repository';
import { PhoneRepository } from './phone.repository';

@Injectable()
export class UserRepository extends GeneralRepository implements IRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,

    @Inject(forwardRef(() => UserRoleRepository))
    private readonly userRoleRepository: UserRoleRepository,
  
    private readonly userSettingsRepository: UserSettingsRepository,
    private readonly userSocialRepository: UserSocialRepository,
    private readonly phoneRepository: PhoneRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(userModel);
    this.setMainPart('User');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    if (populate.populates.indexOf('userroles') !== -1) 
    {
      const tF = new RequestFilterDTO;
      tF.field = 'iduser';
      tF.values = [obj._id];
      const tInfoUR = new RequestListDTO();
      tInfoUR.filters = [tF];
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 99999999;

      obj.userroles = await this.userRoleRepository.findAll(tInfoUR);
    }

    if (populate.populates.includes('usersettings')) 
    {
      const tF = new RequestFilterDTO;
      tF.field = 'iduser';
      tF.values = [obj._id];
      const tInfoUR = new RequestListDTO();
      tInfoUR.filters = [tF];
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 99999999;

      obj.usersettings = await this.userSettingsRepository.findAll(tInfoUR);
    }
    if (populate.populates.includes('usersocial')) 
    {
      const tF = new RequestFilterDTO;
      tF.field = 'iduser';
      tF.values = [obj._id];
      const tInfoUR = new RequestListDTO();
      tInfoUR.filters = [tF];
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 99999999;

      obj.usersocial = await this.userSocialRepository.findAll(tInfoUR);
    }
    if (populate.populates.includes('phones')) 
    {
      const tF = new RequestFilterDTO;
      tF.field = 'iduser';
      tF.values = [obj._id];
      const tInfoUR = new RequestListDTO();
      tInfoUR.filters = [tF];
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 99999999;

      obj.phones = await this.phoneRepository.findAll(tInfoUR);
    }

    return obj;
  }

  processAgregateForList(
    _model: Model<Ischema>,
    options: object,
    info?: RequestListDTO,
    forCount?: boolean,
  ): any {
    const filters = info && info.filters ? info.filters : [];
    const tAgregate = [];

    for (const filter of filters) {
      if (filter.field == 'idrole') {
        tAgregate.push({
          $lookup: {
            from: 'userroles',
            localField: '_id',
            foreignField: 'iduser',
            as: 'userroles',
          },
        });
        
      }
      
    }

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
      if (filter.field == 'search') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            const re = this.getParsedRegExp(value);
            tOr.push({ email: re });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'email') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            tOr.push({ email: value });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'id') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            tOr.push({ _id: value });
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
      if (filter.field == 'idrole') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            tOr.push({ 'userroles.idrole': this.getParsedId(value) });
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
