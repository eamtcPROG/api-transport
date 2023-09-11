import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LabelRepository } from '../repositories/label.repository';
import { LabelDto } from '../dto/label.dto';
import { Label } from '../schemas/label.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostLabelDto } from '../dto/postlabel.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import { PutLabelDto } from '../dto/putlabel.dto';
import { LabelValueDto } from '../dto/labelvalue.dto';
import { PostLabelValueDto } from '../dto/postlabelvalue.dto';
import { LabelValueService } from './labelvalue.service';
import { ResultLabelDto } from '../dto/resultlabel.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { LabelValuePopulateDto } from '../dto/labelvaluepopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class LabelService
  extends GeneralService<LabelRepository, LabelValueService>
  implements IService
{
  constructor(
    private readonly labelRepository: LabelRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => LabelValueService))
    private readonly labelValueService: LabelValueService,
  ) {
    super(labelRepository, labelValueService);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['identifier', 'type']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new LabelDto();
//  console.log('toDto', obj);
    rez.id = this.labelRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty("identifier")) rez.identifier = obj.identifier;
    if (obj.hasOwnProperty("type")) rez.type = obj.type;
    if (obj.hasOwnProperty("status")) rez.status = obj.status;

    if (obj.hasOwnProperty('allvalues')) rez.allvalues = obj.allvalues;
    if (obj.hasOwnProperty('_values'))
    {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('value')) rez.value = obj._values.value;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;
    }
    

    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: LabelDto = new LabelDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('identifier')) obj.identifier = postObj.identifier;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('type')) obj.type = postObj.type;
    return obj;
  }

}
