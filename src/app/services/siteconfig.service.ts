import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SiteConfigRepository } from '../repositories/siteconfig.repository';

import { SiteConfig } from '../schemas/siteconfig.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { SiteConfigDto } from '../dto/siteconfig.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import * as crypto from 'crypto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
import { ToolsDate } from 'src/app/tools/tooldate';
import RequestSortCriteriaDTO from '../dto/requestsortcriteria.dto';

@Injectable()
export class SiteConfigService
    extends GeneralService<SiteConfigRepository, null>
    implements IService {
    constructor(
        private readonly siteConfigRepository: SiteConfigRepository,
        protected readonly configService: ConfigService,

      
    ) {
        super(siteConfigRepository);
    }

    getKeys(): any[] {
        const rez = [];
        rez.push(['identifier']);
        return rez;
    }

    toDto(obj: any): Idto {
        const rez = new SiteConfigDto();

        rez.id = this.siteConfigRepository.getParsedIdStr(obj._id);

        if (obj.hasOwnProperty('identifier')) rez.identifier = obj.identifier;
        if (obj.hasOwnProperty('value')) rez.value = obj.value;
        if (obj.hasOwnProperty('updatedate')) rez.updatedate = obj.updatedate;


        return rez;
    }

    async parseForSave(postObj: any): Promise<Idto> {
        const obj: SiteConfigDto = new SiteConfigDto();
        if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
        if (postObj.hasOwnProperty('identifier')) obj.identifier = postObj.identifier;
        if (postObj.hasOwnProperty('value')) obj.value = postObj.value;
        obj.updatedate = ToolsDate.getTimeStamp();
        return obj;
    }

    // async getHash(): Promise<object> {
    //     const rLDTO = new RequestListDTO();
    //     rLDTO.page = 1;
    //     rLDTO.onpage = 999999;
    //     rLDTO.filters = [];
    //     const total = await this.siteConfigRepository.findCount(rLDTO);
    
    //     let lastId = '';
    //     let lastValue = -1;
    
    //     if (total) {
    //       const lastEntryById: any = await this.findOneSortBy('_id');
    //       lastId = lastEntryById != null ? lastEntryById.id : '';
    
    //       const lastEntryByValue:any = await this.findOneSortBy('updatedate');
    //       lastValue = lastEntryByValue != null ? lastEntryByValue.updatedate : -1;
    //     }
    //     const hash = crypto
    //       .createHash('md5')
    //       .update(`${total}_${lastId}_${lastValue}`)
    //       .digest('hex');
    //     const obj = {
    //       hash: hash,
    //     };
    //     return obj;
    //   }


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
    
        const total = await this.siteConfigRepository.findCount(rLDTO);
        const all = await this.siteConfigRepository.findAll(rLDTO);
        
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


      async findOneSortBy(input: string): Promise<Idto> {
        const obj = await this.siteConfigRepository.findOneSortBy(input);
        if (obj == null) return null;
        return this.toDto(obj);
      }
    
}