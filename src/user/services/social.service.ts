import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocialRepository } from '../repositories/social.repository';
// import { SocialDto } from '../dto/social.dto';
import { Social } from '../schemas/social.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
// import { PostSocialDto } from '../dto/postsocial.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import ResultAddDTO from 'src/app/dto/resultadd.dto';

@Injectable()
export class SocialService
  extends GeneralService<SocialRepository, null>
  implements IService {
  constructor(
    private readonly socialRepository: SocialRepository,
    protected readonly configService: ConfigService,
  ) {
    super(socialRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['iduser', 'idtypesocial']);
    return rez;
  }

  toDto(obj: any): Idto {
    // const rez = new SocialDto();
    let rez
    rez.id = this.socialRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('link')) rez.link = obj.link;
    if (obj.hasOwnProperty('idtypesocial')) rez.idtypesocial = this.socialRepository.getParsedIdStr(obj.idtypesocial);
    if (obj.hasOwnProperty('typesocial')) rez.typesocial = obj.typesocial;
    if (obj.hasOwnProperty('iduser')) rez.iduser = obj.iduser;
    return rez;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    // const obj: SocialDto = new SocialDto();
    let obj
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('link')) obj.link = postObj.link;
    if (postObj.hasOwnProperty('idtypesocial')) obj.idtypesocial = postObj.idtypesocial;
    if (postObj.hasOwnProperty('iduser')) obj.iduser = postObj.iduser;
    return obj;
  }

  async prepareToAddUserSocial(obj: any): Promise<any | null> {
    // const rez = new SocialDto();
    let rez
    if (obj.hasOwnProperty('id') && obj.id) rez.id = obj.id;
    if (obj.hasOwnProperty('link') && obj.link) rez.link = obj.link;
    if (obj.hasOwnProperty('idtypesocial') && obj.idtypesocial) rez.idtypesocial = obj.idtypesocial;
    if (obj.hasOwnProperty('iduser') && obj.iduser) rez.iduser = obj.iduser;

    if (rez.hasOwnProperty('id') && rez.id) {
      if (!rez.hasOwnProperty('link')) {
        await this.delete(rez.id);
        return null;
      }
    }

    if (
      !rez.hasOwnProperty('link') ||
      !rez.hasOwnProperty('idtypesocial') ||
      !rez.hasOwnProperty('iduser')
    ) return null;

    if (!rez.link || !rez.idtypesocial || !rez.iduser) return null;
    
    return rez;
  }

  async parseArrayForSave(objects: any[]): Promise<ResultAddDTO> {
    let rez: ResultAddDTO = CommonTools.toAddResult(false);
    
    for (const obj of objects) {
      const object = await this.prepareToAddUserSocial(obj);
      if (object != null) {
        const res = await this.save(object);
    
        if (res != null) rez = CommonTools.toAddResult(true);

      }
    }
    return rez;
  }
}
