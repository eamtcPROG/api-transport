import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import { Gallery } from '../schemas/gallery.schema';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';

import { GalleryValueRepository } from './galleryvalue.repository';
import Ischema from 'src/app/interfaces/ischema.interface';
import { FileRepository } from 'src/file/repositories/file.repository';
@Injectable()
export class GalleryRepository
  extends GeneralRepository
  implements IRepository {
  constructor(
    @Inject(forwardRef(() => FileRepository))
    private readonly fileRepository: FileRepository,

    @InjectModel('Gallery')
    private readonly galleryModel: Model<Gallery>,

    @Inject(forwardRef(() => GalleryValueRepository))
    private readonly valueRepository: GalleryValueRepository,

    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(galleryModel);
    this.setMainPart('Gallery');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO, idLanguage?: string): Promise<any> {
    if (!obj) return obj;
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    if (idLanguage == undefined) obj = await this.populateObjValues(this.valueRepository, obj, populate, 'idgallery');
    else obj = await this.populateObjValues(this.valueRepository, obj, populate, 'idgallery', idLanguage);

    obj = await this.populateObjFileInfo(this.fileRepository, obj, populate);

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
      //       const re = this.getParsedRegExp(value);
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
            if (!value) continue;
            const v = this.getParsedIdObjectOrStr(value);
            if (!v) continue;
            tOr.push({ idparent: v });
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
            const re = this.getParsedRegExp(value);
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
}
