import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UrlRelationRepository } from '../repositories/urlrelation.repository';

import { UrlRelation } from '../schemas/urlrelation.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { UrlRelationDto } from '../dto/urlrelation.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';

import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
// import { PageService } from 'src/page/services/page.service';
import RequestPopulateDTO from '../dto/requestpopulate.dto';
// import { MenuService } from 'src/menu/services/menu.service';
// import { BlogService } from 'src/blog/services/blog.service';
// import { CourseCategoryService } from 'src/course/services/coursecategory.service';
// import { AdvertisementService } from 'src/advertisement/services/advertisement.service';
@Injectable()
export class UrlRelationService
    extends GeneralService<UrlRelationRepository, null>
    implements IService {
    constructor(
        private readonly urlRelationRepository: UrlRelationRepository,
        protected readonly configService: ConfigService,

        // @Inject(forwardRef(() => PageService))
        // private readonly pageService: PageService,

        // @Inject(forwardRef(() => MenuService))
        // private readonly menuService: MenuService,

        // @Inject(forwardRef(() => AdvertisementService))
        // private readonly advertisementService: AdvertisementService,

        // @Inject(forwardRef(() => BlogService))
        // private readonly blogService: BlogService,

        // @Inject(forwardRef(() => CourseCategoryService))
        // private readonly courseCategoryService: CourseCategoryService,
    ) {
        super(urlRelationRepository);
    }

    getKeys(): any[] {
        const rez = [];
        rez.push(['identifier', 'idobject', 'url']);
        return rez;
    }

    toDto(obj: any): Idto {
        const rez = new UrlRelationDto();

        rez.id = this.urlRelationRepository.getParsedIdStr(obj._id);

        if (obj.hasOwnProperty('identifier')) rez.identifier = obj.identifier;
        if (obj.hasOwnProperty('idobject')) rez.idobject = obj.idobject;
        if (obj.hasOwnProperty('url')) rez.url = obj.url;


        return rez;
    }

    async parseForSave(postObj: any): Promise<Idto> {
        const obj: UrlRelationDto = new UrlRelationDto();
        if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
        if (postObj.hasOwnProperty('identifier')) obj.identifier = postObj.identifier;
        if (postObj.hasOwnProperty('idobject')) obj.idobject = postObj.idobject;
        if (postObj.hasOwnProperty('url')) obj.url = postObj.url;

        return obj;
    }

    async returnObjectByUrl(postObj: any, populate?: RequestPopulateDTO): Promise<any> {
        let obj: any = null;
        let mainObj = null;
        if (postObj.hasOwnProperty('url')) {
            mainObj = await this.getByField('url', postObj.url);
        }
        if (mainObj == null) return null;

        switch (mainObj.identifier) {
            // case 'page': {
            //     obj = mainObj;
            //     obj.obj = await this.pageService.getById(mainObj.idobject, populate);
            //     break;
            // }
            // case 'menu': {
            //     obj = mainObj;
            //     obj.obj = await this.menuService.getById(mainObj.idobject, populate);
            //     break;
            // }
            // case 'blog': {
            //     obj = mainObj;
            //     obj.obj = await this.blogService.getById(mainObj.idobject, populate);
            //     break;
            // }
            // case 'coursecategory': {
            //     obj = mainObj;
            //     obj.obj = await this.courseCategoryService.getById(mainObj.idobject, populate);
            //     break;
            // }
            // case 'advertisement': {
            //     obj = mainObj;
            //     obj.obj = await this.advertisementService.getById(mainObj.idobject, populate);
            //     break;
            // }
            default: { obj = null; break; }
        }
        return obj;
    }

    async registerUrlRelation(identifier:string,idobject:string,url:string): Promise<any> {
        const obj: UrlRelationDto = new UrlRelationDto();
        obj.identifier = identifier;
        obj.idobject = idobject;
        obj.url = url;
        await this.save(obj);
    }
}