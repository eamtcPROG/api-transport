import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserSocialRepository } from '../repositories/usersocial.repository';

// import { UserSocialDto } from '../dto/usersocial.dto';
import { UserSocial } from '../schemas/usersocial.schema';
// import { PostUserSocialDto } from '../dto/postusersocial.dto';
// import { PutUserSocialDto } from '../dto/putusersocial.dto';
import { SocialSignInDto } from 'src/auth/dto/socialsignin.dto'

import RequestListDTO from 'src/app/dto/requestlist.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { SocialIdentifier } from 'src/app/tools/socialidentifier';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export class UserSocialService
  extends GeneralService<UserSocialRepository, null>
  implements IService
{
  constructor(
    private readonly userSocialRepository: UserSocialRepository,
    protected readonly configService: ConfigService,
  ) {
    super(userSocialRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['iduser', 'socialidentifier']);
    return rez;
  }

  toDto(obj: any): Idto {
    // const rez = new UserSocialDto();
let rez:any;
    rez.id = this.userSocialRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('iduser')) rez.iduser = obj.iduser;
    if (obj.hasOwnProperty('socialidentifier')) rez.socialidentifier = obj.socialidentifier;
    if (obj.hasOwnProperty('socialid')) rez.socialid = obj.socialid;
    if (obj.hasOwnProperty('socialuseridentifier'))
      rez.socialuseridentifier = obj.socialuseridentifier;

    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    // const obj: UserSocialDto = new UserSocialDto();
    let obj;
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('iduser')) obj.iduser = postObj.iduser;
    if (postObj.hasOwnProperty('socialidentifier'))
      obj.socialidentifier = postObj.socialidentifier;
    if (postObj.hasOwnProperty('socialid')) obj.socialid = postObj.socialid;
    if (postObj.hasOwnProperty('socialuseridentifier'))
      obj.socialuseridentifier = postObj.socialuseridentifier;
    return obj;
  }

  // UNVERIFIED TEMPORARY

  async createUserSocial(req: SocialSignInDto): Promise<Idto> {
    
    return null;
  }

  async getUserSocialBySocialUserIdentifier(
    req: SocialSignInDto,
  ): Promise<Idto> {
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 1;
    rLDTO.filters = [];

    const tf = new RequestFilterDTO();
    tf.field = 'socialidentifier';
    const value = this.setSocialIdentifier(req.socialidentifier);
    tf.values = [value.toString()];

    const tf1 = new RequestFilterDTO();
    tf1.field = 'socialid';
    tf1.values = [req.socialid];

    rLDTO.filters.push(tf);
    rLDTO.filters.push(tf1);

    const objects = await this.userSocialRepository.findAll(rLDTO);

    if (!objects.length) {
      return null;
    }
    const obj = this.toDto(objects[0]);

    return obj;
  }

  setSocialIdentifier(input: string): number {
    let value = 0;
    switch (input) {
      case 'facebook':
        value = SocialIdentifier.FACEBOOK;
        break;
      case 'linkedin':
        value = SocialIdentifier.LINKEDIN;
        break;
    }
    return value;
  }
}
