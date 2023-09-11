import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LabelValueRepository } from '../repositories/labelvalue.repository';
import { LabelValueDto } from '../dto/labelvalue.dto';
import { LabelValue } from '../schemas/labelvalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { PostLabelValueDto } from '../dto/postlabelvalue.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import { PutLabelValueDto } from '../dto/putlabelvalue.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LabelService } from 'src/label/services/label.service';
import { LabelValuePopulateDto } from '../dto/labelvaluepopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { ResultLabelDto } from '../dto/resultlabel.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import * as crypto from 'crypto';
import { ToolsDate } from 'src/app/tools/tooldate';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import RequestSortCriteriaDTO from 'src/app/dto/requestsortcriteria.dto';

@Injectable()
export class LabelValueService
  extends GeneralService<LabelValueRepository, null>
  implements IService
{
  constructor(
    private readonly labelValueRepository: LabelValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => LabelService))
    private readonly labelService: LabelService,
  ) {
    super(labelValueRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idlabel']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new LabelValueDto();

    rez.id = this.labelValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idlabel'))
      rez.idlabel = this.labelValueRepository.getParsedIdStr(obj.idlabel);
    if (obj.hasOwnProperty("idlanguage"))
      rez.idlanguage = this.labelValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('value')) rez.value = obj.value;
    if (obj.hasOwnProperty('updatedate')) rez.updatedate = obj.updatedate;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;
    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto{
    // console.log(
    //   'parseForSaveValueparseForSaveValueparseForSaveValue55555555555555555555555555555555555555555555',
    //   postObj,
    // );
    if (!postObj.hasOwnProperty('idlanguage')) return null;

    const obj: LabelValueDto = new LabelValueDto();
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    obj.idlabel = id;
    if (postObj.hasOwnProperty('value')) obj.value = postObj.value;
    obj.updatedate = ToolsDate.getTimeStamp();
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: LabelValueDto = new LabelValueDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idlabel')) obj.idlabel = postObj.idlabel;
    if (postObj.hasOwnProperty('value')) obj.value = postObj.value;
    obj.updatedate = ToolsDate.getTimeStamp();
    return obj;
  }

  async getHash(): Promise<object> {
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 1;
    rLDTO.filters = [];

    const sort: RequestSortCriteriaDTO = new RequestSortCriteriaDTO();
    sort.field = 'updatedate';
    sort.asc = false;

    rLDTO.sortcriteria = [];
    rLDTO.sortcriteria.push(sort);

    const total = await this.labelValueRepository.findCount(rLDTO);
    const all = await this.labelValueRepository.findAll(rLDTO);
    
    let lastId = '';
    let lastUpdateDate = -1;

    if (all.length)
    {
      const obj = all[0];
      lastId = obj.id;
      lastUpdateDate = obj.updatedate;
    }

    const hash = crypto.createHash('md5').update(`${total}_${lastId}_${lastUpdateDate}`).digest('hex');

    return {hash: hash};
  }
}
