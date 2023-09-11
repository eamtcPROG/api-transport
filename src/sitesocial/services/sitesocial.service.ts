import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SiteSocialRepository } from '../repositories/sitesocial.repository';
import { SiteSocialDto } from '../dto/sitesocial.dto';
import { SiteSocial } from '../schemas/sitesocial.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostSiteSocialDto } from '../dto/postsitesocial.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class SiteSocialService
  extends GeneralService<SiteSocialRepository, null>
  implements IService
{
  constructor(
    private readonly siteSocialRepository: SiteSocialRepository,
    protected readonly configService: ConfigService,
  ) {
    super(siteSocialRepository);
  }

  getKeys(): any[] {
    const rez = [];
    return rez;
  }
  
  toDto(obj: any): Idto {
    const rez = new SiteSocialDto();

    rez.id = this.siteSocialRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('link')) rez.link = obj.link;
    if (obj.hasOwnProperty('idtypesocial')) rez.idtypesocial = this.siteSocialRepository.getParsedIdStr(obj.idtypesocial);
    if (obj.hasOwnProperty('typesocial')) rez.typesocial = obj.typesocial;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: SiteSocialDto = new SiteSocialDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('link')) obj.link = postObj.link;
    if (postObj.hasOwnProperty('idtypesocial')) obj.idtypesocial = postObj.idtypesocial;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    return obj;
  }
}
