import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import Ischema from '../interfaces/ischema.interface';
import RequestPopulateDTO from '../dto/requestpopulate.dto';
import RequestListDTO from '../dto/requestlist.dto';
import RequestSortCriteriaDTO from '../dto/requestsortcriteria.dto';
import { AnyARecord } from 'dns';
import RequestFilterDTO from '../dto/requestfilter.dto';
import IRepository from '../interfaces/irepository.interface';
// import { RepositoryInterface } from 'src/nomenclature/interfaces/repository.interface';
import Idto from '../interfaces/idto.interface';
import IService from '../interfaces/iservice.interface';
import { CommonTools } from '../tools/commontools';
import ResultDeleteDTO from '../dto/resultdelete.dto';

@Injectable()
export abstract class GeneralService<
  // Repo extends RepositoryInterface,
  Repo extends IRepository,
  ValueService extends IService,
> {
  constructor(
    protected readonly repository: Repo,
    protected readonly valueService?: ValueService,
  ) { }

  abstract toDto(obj: any): Idto;
  abstract parseForSave(postObj: any): Promise<Idto>;
  abstract getKeys(): any[];

  parseForSaveValue(postObj: any, id: string): Idto {
    return {};
  }

  toDtoArray(objs: any[]): Idto[] {
    const rez = new Array<Idto>();

    objs.map((item) => {
      const obj = this.toDto(item);
      rez.push(obj);
    });

    return rez;
  }

  async getById(id: string, populate?: RequestPopulateDTO, idLanguage?: string): Promise<Idto> {
    let obj;

    if (idLanguage == undefined) obj = await this.repository.findById(id, populate);
    else obj = await this.repository.findById(id, populate, idLanguage);
    if (obj == null) return null;

    return this.toDto(obj);
  }

  async getByField(field: string, value: any, populate?: any): Promise<Idto> {
    const objects = await this.getByFieldList(field, value, 1, populate);
    if (objects == undefined) return null;
    if (!objects.length) return null;

    
    return objects[0];
  }

  async getByFieldList(
    field: string,
    value: any,
    onPage?: number,
    populate?: any
  ): Promise<Idto[]> {
    onPage = onPage ?? 10000;
    const fileter = new RequestFilterDTO();
    fileter.field = field;
    fileter.values = [value];
    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = onPage;
    rLDTO.filters = [];
    rLDTO.filters.push(fileter);
    populate = populate ?? [];
    rLDTO.populate = new RequestPopulateDTO();
    rLDTO.populate.addToPopulates(populate);
    const obj = await this.getAll(rLDTO);
    if (obj == null) return null;

    return obj;
  }

  async getAll(options: RequestListDTO): Promise<Idto[]> {
    const objs = await this.repository.findAll(options);
    if (objs == null) return null;
    return this.toDtoArray(objs);
  }

  async getCount(options: RequestListDTO): Promise<number> {
    return await this.repository.findCount(options);
  }

  async delete(id: string): Promise<ResultDeleteDTO> {
    this.deleteOtherData(id);
    await this.deleteValue(id);

    const obj = await this.repository.delete(id);

    if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
    return CommonTools.toDeleteResult(true);
  }

  async getByKey(postObj: any, keys: string[]): Promise<Idto> {
    if (!postObj) return null;
    if (!Array.isArray(keys)) return null;
    if (!keys.length) return null;

    let exist = true;

    const rLDTO = new RequestListDTO();
    rLDTO.page = 1;
    rLDTO.onpage = 1;
    rLDTO.filters = [];

    keys.map((field) => {
      if (!exist) return;

      if (postObj[field] === null) {
        exist = false;
        return;
      }

      const tf = new RequestFilterDTO();
      tf.field = field;
      tf.values = [postObj[field]];

      rLDTO.filters.push(tf);
    });

    if (!exist) return null;



    const objects = await this.getAll(rLDTO);

    if (!objects) return null;
    if (!objects.length) return null;

    return objects[0];
  }

  async existObj(postObj: any, id?: string): Promise<Idto> {
    if (id) return await this.getById(id);

    let obj = null;

    const keys = this.getKeys();

    await Promise.all(
      keys.map(async (key) => {
        if (obj) return;
        obj = await this.getByKey(postObj, key);
      }),
    );

    return obj;
  }

  async existId(postObj: Idto, id?: string): Promise<any> {
    if (id) return id;

    const obj: any = await this.existObj(postObj, id);

    if (obj && obj.id) return obj.id;

    return null;
  }

  async save(postObj: Idto, id?: string): Promise<Idto> {
    const preparedObj = await this.parseForSave(postObj);
    
    const new_id = await this.existId(postObj, id);

    if (
      new_id &&
      (!id || id == null || id == undefined) &&
      JSON.parse(JSON.stringify(postObj)).hasOwnProperty('_nonupdate')
    ) {
      return await this.getById(new_id);
    }

    let savedObj: any = null;

    if (new_id) {
      const obj = await this.repository.update(new_id, preparedObj);
      if (obj.matchedCount !== 0) {
        savedObj = await this.getById(new_id);
      }
    } else {
      
      const obj: any = await this.repository.save(preparedObj);
      const objd: any = this.toDto(obj);
      savedObj = await this.getById(objd.id);
    }

    await this.saveValue(postObj, savedObj.id);

    savedObj = await this.getById(savedObj.id);

    this.saveOtherData(savedObj,postObj);
    return savedObj;
  }

  async saveValue(postObj: Idto, id: string): Promise<any> {
    if (this.valueService == null) return;
    if (this.valueService == undefined) return;

    const preparedObj = this.valueService.parseForSaveValue(postObj, id);

    await this.valueService.save(preparedObj);
  }
  async saveOtherData(obj:any,postObj:any): Promise<any> {}
  async deleteOtherData(id:string): Promise<any> {}

  async deleteValue(id: string): Promise<any> {
    if (!this.valueService) return;

    const p: RequestPopulateDTO = new RequestPopulateDTO();
    p.addToPopulates('allvalues');
    const eobj: any = this.getById(id, p);

    if (eobj && eobj.allvalues) {
      eobj.allvalues.map(async (v) => {
        await this.valueService.delete(v.id);
      });
    }
  }
}
