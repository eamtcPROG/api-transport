import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { File } from '../schemas/file.schema';
import { GeneralRepository } from 'src/app/repositories/general.repository';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import IRepository from 'src/app/interfaces/irepository.interface';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { ConfigService } from '@nestjs/config';
import { FileDto } from '../dto/file.dto';

@Injectable()
export class FileRepository extends GeneralRepository implements IRepository {
  constructor(
    @InjectModel('File')
    private readonly fileModel: Model<File>,
  
    @Inject(forwardRef(() => ConfigService))
    protected readonly configService: ConfigService,
  ) {
    super();
    this.setModel(fileModel);
    this.setMainPart('File');
    this.setConfigService(this.configService);
  }

  async populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any> {
    obj = await this.populateObjFilePath(obj, populate);
    return obj;
  }

  protected async populateObjFilePath(
    obj: any,
    populate?: RequestPopulateDTO,
  ): Promise<any> {
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    if (populate.populates.indexOf('fileinfo') === -1) return obj;

    obj.fullpath = await this.getFileUrl(obj);
    
    return obj;
  }
  

  public async getFileUrl(
    obj:any,
  ): Promise<string> {
    this.configService.get('config.urls.api_server');
        
    return this.configService.get('urls.api_server') + '/file/object/' + obj._id + '/' + encodeURIComponent(obj.name);
  }

  processOptionForList(info?: RequestListDTO): object {
    if (info == null) return {};

    if (info.filters == null) return {};
    const rez: any = {};

    const tAnd = [];
    for (const filter of info.filters) {
      if (filter.field == 'search') {
        const tOr = [];
        const values = filter.values;
        if (Array.isArray(values)) {
          for (const value of values) {
            const re = this.getParsedRegExp(value);
            tOr.push({ name: re });
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
