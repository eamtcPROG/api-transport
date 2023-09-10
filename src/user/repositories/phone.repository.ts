import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Phone } from '../schemas/phone.schema';
import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
// import { TypePhoneRepository } from 'src/nomenclature/repositories/typephone.repository';

@Injectable()
export class PhoneRepository extends GeneralRepository implements IRepository {
  constructor(
    @InjectModel('Phone')
    private readonly phoneModel: Model<Phone>,

    // @Inject(forwardRef(() => TypePhoneRepository))
    // private readonly typePhoneRepository: TypePhoneRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(phoneModel);
    this.setMainPart('Phone');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    // if (populate.populates.includes('idtypephone') && obj.idtypephone)
    //   obj.typephone = await this.typePhoneRepository.findById(obj.idtypephone, populate);

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
            tOr.push({ phonenumber: re });
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'iduser') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            tOr.push({ iduser: value });
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
