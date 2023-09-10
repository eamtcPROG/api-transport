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
import { ConfigService } from '@nestjs/config';
import { CommonTools } from '../tools/commontools';
// import { AttachmentRepository } from 'src/attachment/repositories/attachment.repository';
import { constants } from 'crypto';
import { Status } from '../tools/status';

@Injectable()
export abstract class GeneralRepository {
  protected _model: Model<Ischema>;
  protected configService: ConfigService;
  protected mainPart: string;


  constructor() { }


  setModel(m: Model<Ischema>) {
    this._model = m;
  }
  setMainPart(m: string) {
    this.mainPart = m;
  }
  setConfigService(c: ConfigService) {
    this.configService = c;
  }

  abstract processOptionForList(info?: RequestListDTO): object;
  abstract populateObj(obj: any, populate?: RequestPopulateDTO, idLanguage?: string): Promise<any>;

  getParsedId(value: any): any {
    const v = typeof value == 'object' && value !== null && value !== undefined ?
      value.toHexString() : value;
    return Types.ObjectId.createFromHexString(v);
  }

  getParsedIdObjectOrStr(value: any): string {
    if (value instanceof Types.ObjectId) {
      return value.toHexString();
    }
  
    if (typeof value === 'string') {
      return value;
    }
    return ''
  }

  getParsedIdStr(value: any): any {
    return typeof value == 'object' && value !== null && value !== undefined ?
      value.toHexString() : value;
  }

  getParsedString(value: any): any {
    return typeof value == 'object' && value !== null && value !== undefined ?
      value.toString() : value;
  }

  getParsedRegExp(value: any): any {
    let v = typeof value == 'object' && value !== null && value !== undefined ?
      value.toString() : value;
    v = v.trim();
    return new RegExp(v, 'i');
  }

  async generateFullName(obj: any, repo: any, populate: RequestPopulateDTO, field?: string): Promise<any> {
    field = field ? field : 'name'
    if (!obj && !obj.hasOwnProperty('idparent')) return obj;
    if (obj.idparent == '') {
      obj.fullname = obj[field];
    } else {
      const parent = await repo.findById(obj.idparent, populate);
      if (parent == null) return obj;
      obj.fullname = parent.fullname + ',' + obj[field];
    }
    return obj
  }

  protected async populateIdsObject(
    repo: IRepository,
    idsArr: string[],
    populate?: RequestPopulateDTO
  ): Promise<any[]> {
    if (idsArr == undefined) return [];
    const rez = new Array<any>;

    if (idsArr.length) {
      await Promise.all(
        idsArr.map(async (id) => {
          const t = await repo.findById(this.getParsedId(id), populate);
          rez.push(t);
        }
        ))

    }
    return rez;

  }

  async findListByField(field: string, value: any, populate?: RequestPopulateDTO,filter?:RequestFilterDTO[]): Promise<any[]> {
    const tF = new RequestFilterDTO();
    tF.field = field;
    tF.values = [value];
    let filters = new Array<RequestFilterDTO>();
    filters = filter != undefined ? filter : [];
    filters.push(tF);
    
    const tInfoUR = new RequestListDTO();
    tInfoUR.filters = filters;
    tInfoUR.populate = populate;
    tInfoUR.page = 1;
    tInfoUR.onpage = 99999999;

    return await this.findAll(tInfoUR);
  }
  async prepareHasChildren(obj: any): Promise<any> {
    if (obj == undefined) return obj;
    if (!obj.hasOwnProperty('_id')) return obj;
    const filters = new Array<RequestFilterDTO>();
    const tF = new RequestFilterDTO();
    tF.field = 'status';
    tF.values = [Status.ACTIVE.toString()];
    filters.push(tF);
    const objects = await this.findListByField('idparent', this.getParsedIdStr(obj._id),undefined,filters);
    if (objects.length > 0) obj.haschildren = true;
    else obj.haschildren = false;
    return obj;
  }

  protected async populateObjValues(
    valueRepo: IRepository,
    obj: any,
    populate?: RequestPopulateDTO,
    field?: string,
    expectedIdLanguage?: string,
  ): Promise<any> {
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    field = field ?? 'idtype';



    if (populate.populates.indexOf('allvalues') !== -1) {
      const tF = new RequestFilterDTO();
      tF.field = field;
      tF.values = [obj._id];
      const tInfoUR = new RequestListDTO();
      tInfoUR.filters = [tF];
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 99999999;

      obj.allvalues = await valueRepo.findAll(tInfoUR);
    }

    if (
      populate.populates.indexOf('values') !== -1 ||
      populate.populates.indexOf('_full') !== -1
    ) {

      let idLanguage = null;
      if (expectedIdLanguage == undefined) idLanguage = CommonTools.getHeader('idLanguage');
      else idLanguage = expectedIdLanguage;

      idLanguage = idLanguage ?? this.configService.get('config.default_language_id');

      let tInfoUR = new RequestListDTO();
      tInfoUR.populate = populate;
      tInfoUR.page = 1;
      tInfoUR.onpage = 1;
      tInfoUR.filters = [];

      let tF = new RequestFilterDTO();
      tF.field = field;
      tF.values = [obj._id];
      tInfoUR.filters.push(tF);

      tF = new RequestFilterDTO();
      tF.field = 'idlanguage';
      tF.values = [idLanguage];
      tInfoUR.filters.push(tF);

      let tall = await valueRepo.findAll(tInfoUR);

      if (tall && tall.length) {
        obj._values = tall[0];
        if (obj._values.hasOwnProperty('name')) obj.name = obj._values.name;
      } else if (tall.length == 0 && expectedIdLanguage !== undefined) {
        obj._values = [{}];
      }
      else {
        tInfoUR = new RequestListDTO();
        tInfoUR.populate = populate;
        tInfoUR.page = 1;
        tInfoUR.onpage = 1;
        tInfoUR.filters = [];

        tF = new RequestFilterDTO();
        tF.field = field;
        tF.values = [obj._id];
        tInfoUR.filters.push(tF);

        tall = await valueRepo.findAll(tInfoUR);

        if (tall && tall.length) {
          obj._values = tall[0];
          if (obj._values.hasOwnProperty('name')) obj.name = obj._values.name;
        }
      }

    }

    return obj;
  }

  
  
  protected async populateObjFileInfo(
    repo: IRepository,
    obj: any,
    populate?: RequestPopulateDTO,
    field?: string
  ): Promise<any> {
    if (populate == undefined) return obj;
    if (populate.populates == undefined) return obj;

    field = field ?? 'idfile';
    if (
      populate.populates.indexOf('fileinfo') === -1
    ) return obj;

    if (!obj[field]) return obj;

    const fileInfoObj = await repo.findById(obj[field], populate);

    if (fileInfoObj == null) return obj;

    obj.fileInfoObj = fileInfoObj;

    return obj;
  }

  processAgregateForList(
    _model: Model<Ischema>,
    options: object,
    info?: RequestListDTO,
    forCount?: boolean,
  ): any {
    const tAgregate = [];

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

  processAgregateForListValues(
    info?: RequestListDTO,
    field?: string,
    fromTableName?: string
  ): any {
    const tAgregate = [];

    field = field ?? 'id' + this.mainPart.toLowerCase();

    const filters = info && info.filters ? info.filters : [];
    fromTableName = fromTableName ?? this.mainPart.toLowerCase() + 'values';

    for (const filter of filters) {
      if (filter.field == 'searchvalue') {
        tAgregate.push({
          $lookup: {
            from: fromTableName,
            localField: '_id',
            foreignField: field,
            as: 'values',
          },
        });
      }
    }

    return tAgregate;
  }

  async findById(id: string, populate?: RequestPopulateDTO, idLanguage?: string): Promise<any> {

    const rez = this._model.findById(id);
    let obj = await rez.exec();

    obj = JSON.parse(JSON.stringify(obj));
    if (idLanguage == undefined) return await this.populateObj(obj, populate);
    else return await this.populateObj(obj, populate, idLanguage);
  }

  async findAll_test(info?: RequestListDTO): Promise<any[]> {
    const options = this.processOptionForList(info);
    // let rez = this._model.find(options);
    let rez = this.processAgregateForList(this._model, options, info);
    rez = this.parseAdminMongoQuery(rez, info);
    // rez = this.processAgregateForList(this._model, rez, info);
    rez = this.parseAdminPopulate(rez, info);

    const roleId = '645a65b1ab4e7bd6c60188b7'; // Role ID as string
    const roleIdObject = Types.ObjectId.createFromHexString(roleId); // Convert to ObjectId
    const userIdObject = Types.ObjectId.createFromHexString(
      '645685926e93b20e0e2f9695',
    ); // Convert to ObjectId

    // const t = await rez.exec();
    // const t = await this._model.aggregate().sample(3);
    const t = await this._model
      .aggregate([
        {
          $lookup: {
            from: 'userroles',

            localField: '_id',
            foreignField: 'iduser',

            // let: { iduser: '$iduser' },

            // pipeline: [
            //   {
            //     $match: {
            //       $expr: {
            //         $and: [
            //           { $eq: ['$$iduser', '$_id'] },
            //           // { $eq: ['$idrole', '645bbbf32a1eda9afe3fbcb8'] },
            //         ],
            //       },
            //     },
            //   },
            //   // { $project: { idrole: 1, _id: 1 } },
            // ],

            as: 'userroles',
            //  $project: { idrole: 1 } ,

            // localField: '_id',
            // foreignField: 'iduser',
            // as: 'userroles',
            // let: { idrole: '$idrole' },
            // pipeline: [
            //   {
            //     $match: {
            //       $and: [{ $or: [{ $$idrole: '645bbbf32a1eda9afe3fbcb8' }] }],
            //     },
            //   },
            // ],
          },
        },
        // {
        //   $project: {
        //     items: {
        //       $filter: {
        //         input: '$items',
        //         as: 'item',
        //         cond: { $eq: ['$$item.status', '11'] },
        //       },
        //     },
        //   },
        // },
        // { $match: { status: 2 } },
        // { $unwind: '$userroles' },
        // {$project: {$userroles: 1, "idrole":"$userroles.idrole", _id:1, 'status': 1}},
        // {$project: {'userroles._id': 1, _id:1, 'status': 1}},
        // {
        //   $replaceRoot: {
        //     newRoot: {
        //       $mergeObjects: [{ $arrayElemAt: ['$userroles', 0] }, '$$ROOT'],
        //     },
        //   },
        // },
        // {
        //   $replaceRoot: {
        //     newRoot: {
        //       $mergeObjects: ['$userroles', '$$ROOT'],
        //     },
        //   },
        // },

        // {
        //   $group: {
        //     _id: '$_id',
        //     otherFields: { $first: '$otherFields' },
        //     populatedArray: { $push: '$userroles' },
        //   },
        // },

        {
          $match: {
            $and: [
              { $or: [{ status: 1 }, { status: 2 }] },
              { $or: [{ _id: userIdObject }] },
              // {
              //   $or: [{ 'userroles.idrole': roleIdObject }],
              // },
            ],
          },
        },
        // {
        //   $group: {
        //     _id: null
        //   },
        // },
        // { $project: { mainobj: true } },
        // { $unwind: '$mainobj' },
        // { $match:{when: { '$and': [{ '$or': [{ status: '1' }, { status: '2' }] }] }} }
        // { $match: { when: { status: '1' } } }
        // { $search: { status: '1' } },
      ])
      // .match({ 'users.status': { $eq: '2' } })
      // .search({query: { status: { $eq: '2' } } })
      // .search({ status: '1' })
      // .find({ $and: [{ $or: [{ status: '1' }, { status: '2' }] }] })
      // .sample(4);
      .skip(0)
      .limit(20)
      // .pipeline();
      .exec();

    // const t = t1.exec();
    // .exec();
    // const t = await rez.pipeline();


    return t;
  }

  async findAll(info?: RequestListDTO): Promise<any[]> {
    const options = this.processOptionForList(info);

    let rez = this.processAgregateForList(this._model, options, info);

    rez = this.parseAdminMongoQuery(rez, info);
    // rez = this.parseAdminPopulate(rez, info);

    const data = await rez.exec();

    let objects = [];

    for (var i in data) {
      const t = await this.populateObj(data[i], info.populate);
      objects.push(t);
    }

    return objects;
  }

  async findCount_test(info?: RequestListDTO): Promise<any> {
    const roleId = '645a65b1ab4e7bd6c60188b7'; // Role ID as string
    const roleIdObject = Types.ObjectId.createFromHexString(roleId); //

    // const t = await rez.exec();
    // const t = await this._model.aggregate().sample(3);
    const t = await this._model
      .aggregate([
        // {
        //   $lookup: {
        //     from: 'userroles',

        //     localField: '_id',
        //     foreignField: 'iduser',
        //     as: 'userroles',
        //   },
        // },
        // { $unwind: '$userroles' },
        {
          $match: {
            $and: [
              { $or: [{ status: 1 }, { status: 2 }] },
              // {
              //   $or: [{ 'userroles.idrole': roleIdObject }],
              // },
            ],
          },
        },
        { $count: 'total' },
      ])
      .exec();
    return 1999;
  }

  async findCount(info?: RequestListDTO): Promise<any> {
    const options = this.processOptionForList(info);
    let rez = this.processAgregateForList(this._model, options, info, true);

    let t = await rez.exec();
    t = t && t.length ? t[0] : {};
    const r = t && t.total ? t.total : 0;

    return r;
  }

  async save(obj: Ischema): Promise<any> {
    return await new this._model(obj).save();
  }

  async delete(id: string, cb?: any): Promise<any> {
    if (cb) {
      return await this._model.deleteOne({ _id: id }, () => {
        cb();
      });
    }
    return await this._model.deleteOne({ _id: id });
  }

  async deleteByFielter(filter: object, cb?: any): Promise<any> {
    if (cb) {
      return await this._model.deleteMany(filter, () => {
        cb();
      });
    }
    return await this._model.deleteMany(filter);
  }

  async update(id: string, obj: Ischema): Promise<any> {
    return await this._model.updateOne({ _id: id }, obj).exec();
  }

  async execQuery(promise: any): Promise<any[]> {
    return await promise.exec();
  }

  parseAdminMongoQuery(rez: any, data?: RequestListDTO): any {
    if (data.sortcriteria != null) {
      const t = {};
      for (var i in data.sortcriteria) {
        const sc: RequestSortCriteriaDTO = data.sortcriteria[i];
        t[sc.field] = sc.asc ? 1 : -1;
      }
      rez = rez.sort(t);
    }
    if (data.page != null && data.onpage != null) {
      const s = (data.page - 1) * data.onpage;
      rez = rez.skip(s);
      rez = rez.limit(data.onpage);
    }
    return rez;
  }

  parseAdminPopulate(rez: any, data?: RequestListDTO): any {
    if (data.populate != null && data.populate.populates != null) {
      rez = this.parseAdminPopulateItem(rez, data.populate);
    }

    return rez;
  }

  parseAdminPopulateItem(rez: any, data?: RequestPopulateDTO): any {
    // if (data != null && data.populates != null) {
    //   for (var i in data.populates) {
    //     rez = rez.populate(data.populates[i]);
    //   }
    // }

    if (data != null && data.populates != null) {
      for (var i in data.populates) {
        if (data.populates[i].includes('.')) {
          // Handle nested population path
          const paths = data.populates[i].split('.');
          let populateObject = {};
          let currentObject = populateObject;

          for (let j = 0; j < paths.length; j++) {
            currentObject['path'] = paths[j];
            if (j < paths.length - 1) {
              const newObject = {};
              currentObject['populate'] = newObject;
              currentObject = newObject;
            }
          }

          rez = rez.populate(populateObject);
        } else {
          // Handle non-nested population path
          rez = rez.populate(data.populates[i]);
        }
      }
    }

    return rez;
  }
}
