import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserSettings } from 'src/user/schemas/usersettings.schema';
import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
// import { TypeGenderRepository } from 'src/nomenclature/repositories/typegender.repository';
// import { GalleryRepository } from 'src/gallery/repositories/gallery.repository';
// import { AddressRepository } from 'src/address/repositories/address.repository';
// import { LanguageRepository } from 'src/language/repositories/language.repository';
import { PhoneRepository } from './phone.repository';

@Injectable()
export class UserSettingsRepository
  extends GeneralRepository
  implements IRepository {
  constructor(
    @InjectModel('UserSettings')
    private readonly userSettingsModel: Model<UserSettings>,

    // private readonly typeGenderRepository: TypeGenderRepository,

    // @Inject(forwardRef(() => GalleryRepository))
    // private readonly galleryRepository: GalleryRepository,

    // @Inject(forwardRef(() => AddressRepository))
    // private readonly addressRepository: AddressRepository,

    // @Inject(forwardRef(() => LanguageRepository))
    // private readonly languageRepository: LanguageRepository,
    
    @Inject(forwardRef(() => PhoneRepository))
    private readonly phoneRepository: PhoneRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(userSettingsModel);
    this.setMainPart('UserSettings');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    // console.log('populateObj', obj);
    // if (populate.populates.includes('idtypegender') && obj.idtypegender)
    //   obj.typegender = await this.typeGenderRepository.findById(obj.idtypegender, populate);

    // if (populate.populates.includes('idavatar') && obj.idavatar)
    //   obj.avatar = await this.galleryRepository.findById(obj.idavatar, populate);

    // if (populate.populates.includes('idphysicaladdress') && obj.idphysicaladdress)
    //   obj.physicaladdress = await this.addressRepository.findById(obj.idphysicaladdress, populate);

    // if (populate.populates.includes('idlanguage') && obj.idlanguage)
    //   obj.language = await this.languageRepository.findById(obj.idlanguage, populate);
    
    if (populate.populates.includes('idsphone') && obj.idsphone)
      obj.phones = await this.populateIdsObject(this.phoneRepository, obj.idsphone, populate);
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

      if (filter.field == 'iduser') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            tOr.push({ iduser: this.getParsedId(value) });
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
