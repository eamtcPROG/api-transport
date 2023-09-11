import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { BlogCategory } from '../schemas/blogcategory.schema';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import Ischema from 'src/app/interfaces/ischema.interface';
import { BlogCategoryValueRepository } from './blogcategoryvalue.repository';
import { TypeBlogCategoryRepository } from 'src/nomenclature/repositories/typeblogcategory.repository';

@Injectable()
export class BlogCategoryRepository
  extends GeneralRepository
  implements IRepository
{
  constructor(
    @InjectModel('BlogCategory')
    private readonly blogCategoryModel: Model<BlogCategory>,
  
    @Inject(forwardRef(() => BlogCategoryValueRepository))
    private readonly valueRepository: BlogCategoryValueRepository,

    private readonly typeBlogCategoryRepository: TypeBlogCategoryRepository,
    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(blogCategoryModel);
    this.setMainPart('BlogCategory');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO,idLanguage?:string): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    if(idLanguage == undefined) obj = await this.populateObjValues(this.valueRepository, obj, populate, 'idblogcategory');
    else obj = await this.populateObjValues(this.valueRepository, obj, populate, 'idblogcategory', idLanguage);

    if (populate.populates.includes('idtypeblogcategory') && obj.idtypeblogcategory)
      obj.typeblogcategory = await this.typeBlogCategoryRepository.findById(obj.idtypeblogcategory, populate);
    

    return obj;
  }
  processAgregateForList(
    _model: Model<Ischema>,
    options: object,
    info?: RequestListDTO,
    forCount?: boolean,
  ): any {

    const tAgregate = this.processAgregateForListValues(
      info
    );

   
    tAgregate.push({
      $match: options,
    });

    if (forCount) {
      tAgregate.push({
        $count: 'total',
      });
    }

    return _model.aggregate(tAgregate);
  }
  processOptionForList(info?: RequestListDTO): object {
    if (info == null) return {};

    if (info.filters == null) return {};
    const rez: any = {};

    const tAnd = [];
    for (const filter of info.filters) {
      // if (filter.field == 'search') {
      //   const tOr = [];
      //   const values = filter.values;
      //   if (Array.isArray(values)) {
      //     for (const value of values) {
      //       const re = new RegExp(value, 'i');
      //       tOr.push({ name: re });
      //     }
      //   }
      //   if (tOr.length) {
      //     tAnd.push({ $or: tOr });
      //   }
      // }
      if (filter.field == 'idparent') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            tOr.push({ idparent: value});
          }
        }
        if (tOr.length) {
          tAnd.push({ $or: tOr });
        }
      }
      if (filter.field == 'searchvalue') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            if (!value) continue;
            const re = new RegExp(value, 'i');
            tOr.push({ 'values.name': re });
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

  async findSortedByCode(info?: RequestListDTO): Promise<BlogCategory[]> {
    const options = this.processOptionForList(info);
    return this.blogCategoryModel.find(options).sort({ code: -1 }).exec();
  }
}
