import RequestListDTO from "src/app/dto/requestlist.dto";
import { ModelInterface } from "./model.interface";
import { Model } from "mongoose";
import Ischema from "src/app/interfaces/ischema.interface";
import RequestPopulateDTO from "src/app/dto/requestpopulate.dto";
import { ConfigService } from "@nestjs/config";
import IRepository from 'src/app/interfaces/irepository.interface';

export interface RepositoryInterface {
  findById(id: string, populate: RequestPopulateDTO, idLanguage?: string): Promise<any>;
  findAll(options: RequestListDTO): Promise<any[]>;
  findCount(options: RequestListDTO): Promise<number>;
  save(postObj: object): Promise<any>;
  delete(id: string): Promise<{ deletedCount: number }>;
  update(id: string, putObj: object): Promise<{ matchedCount: number }>;
  // Add other methods here...

  // processAgregateForList(
  //   _model: Model<Ischema>,
  //   options: object,
  //   info?: RequestListDTO,
  //   forCount?: boolean,
  // ): any;

  // processOptionForList(info?: RequestListDTO): object;

  // populateObj(obj: any, populate?: RequestPopulateDTO): Promise<any>;

  setModel(m: Model<Ischema>);

  setConfigService(c: ConfigService);

  getParsedId(value: any): any;

  getParsedIdStr(value: any): any;

  getParsedString(value: any): any;

  getParsedRegExp(value: any): any;
}