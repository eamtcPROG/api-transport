import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PhoneRepository } from '../repositories/phone.repository';
import { PhoneDto } from 'src/user/dto/phone.dto';
import { Phone } from '../schemas/phone.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostPhoneDto } from 'src/user/dto/postphone.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { Status } from 'src/app/tools/status';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class PhoneService
  extends GeneralService<PhoneRepository, null>
  implements IService
{
  constructor(
    private readonly phoneRepository: PhoneRepository,
    protected readonly configService: ConfigService,
  ) {
    super(phoneRepository);
  }

  getKeys(): any[] {
    const rez = [];
    
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new PhoneDto();
    // let rez

    rez.id = this.phoneRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('phonenumber')) rez.phonenumber = obj.phonenumber;
    if (obj.hasOwnProperty('countrycode')) rez.countrycode = obj.countrycode;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('activationcode')) rez.activationcode = obj.activationcode;
    if (obj.hasOwnProperty('idtypephone')) rez.idtypephone = obj.idtypephone;
    if (obj.hasOwnProperty('typephone')) rez.typephone = obj.typephone;
    if (obj.hasOwnProperty('iduser')) rez.iduser = obj.iduser;

    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: PhoneDto = new PhoneDto();
    // let obj;
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('phonenumber')) obj.phonenumber = postObj.phonenumber;
    if (postObj.hasOwnProperty('countrycode')) obj.countrycode = postObj.countrycode;
    if (postObj.hasOwnProperty('idtypephone')) obj.idtypephone = postObj.idtypephone;
    if (postObj.hasOwnProperty('iduser')) obj.iduser = postObj.iduser;
    
    obj.status = postObj.status ? postObj.status : Status.INACTIVE;
    obj.activationcode = CommonTools.generateRandomDigitString(5);
    return obj;
  }
}
