import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserSettingsRepository } from '../repositories/usersettings.repository';
import { UserSettingsDto } from 'src/user/dto/usersettings.dto';
import { UserSettings } from '../schemas/usersettings.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostUserSettingsDto } from 'src/user/dto/postusersettings.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class UserSettingsService
  extends GeneralService<UserSettingsRepository, null>
  implements IService {
  constructor(
    private readonly userSettingsRepository: UserSettingsRepository,
    protected readonly configService: ConfigService,
  ) {
    super(userSettingsRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['iduser']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new UserSettingsDto();

    rez.id = this.userSettingsRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('iduser')) rez.iduser = this.userSettingsRepository.getParsedIdStr(obj.iduser);
    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('surname')) rez.surname = obj.surname;
    if (obj.hasOwnProperty('birthday')) rez.birthday = obj.birthday;
    if (obj.hasOwnProperty('idtypegender')) rez.idtypegender =  this.userSettingsRepository.getParsedIdStr(obj.idtypegender);
    if (obj.hasOwnProperty('idsphone')) rez.idsphone = obj.idsphone;
    if (obj.hasOwnProperty('idlanguage')) rez.idlanguage = this.userSettingsRepository.getParsedIdStr( obj.idlanguage);
    if (obj.hasOwnProperty('idavatar')) rez.idavatar = obj.idavatar;
    // if (obj.hasOwnProperty('idphysicaladdress')) rez.idphysicaladdress =  this.userSettingsRepository.getParsedIdStr(obj.idphysicaladdress);
   
    if (obj.hasOwnProperty('typegender')) rez.typegender = obj.typegender;
    if (obj.hasOwnProperty('avatar')) rez.avatar = obj.avatar;
    if (obj.hasOwnProperty('physicaladdress')) rez.physicaladdress = obj.physicaladdress;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;
    if (obj.hasOwnProperty('phones')) rez.phones = obj.phones;

    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: UserSettingsDto = new UserSettingsDto();
    
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('iduser') && postObj.iduser) obj.iduser = postObj.iduser;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    if (postObj.hasOwnProperty('surname')) obj.surname = postObj.surname;
    if (postObj.hasOwnProperty('birthday')) obj.birthday = postObj.birthday;
    if (postObj.hasOwnProperty('idtypegender') && postObj.idtypegender) obj.idtypegender = postObj.idtypegender;
    // if (postObj.hasOwnProperty('idsphone')) obj.idsphone = postObj.idsphone;
    if (postObj.hasOwnProperty('idlanguage') && postObj.idlanguage) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idavatar') && obj.idavatar) obj.idavatar = postObj.idavatar;
    // if (postObj.hasOwnProperty('idphysicaladdress')) obj.idphysicaladdress = postObj.idphysicaladdress;

    return obj;
  }

  async getUserSettingsByIdUser(iduser: string): Promise<UserSettingsDto> {
    const obj = await this.getByField('iduser', iduser) as UserSettingsDto;
    if (obj == null) return null;
    return obj;
  }

  
}
