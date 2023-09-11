import RequestListDTO from "src/app/dto/requestlist.dto";
import { ModelInterface } from "./model.interface";
import { Model } from "mongoose";
import Ischema from "src/app/interfaces/ischema.interface";
import { ConfigService } from "@nestjs/config";

export interface RepositoryValueInterface {
  findById(id: string): Promise<any>;
  findById(id: string, requestPopulateDTO: any): Promise<any>;
  findAll(options: RequestListDTO): Promise<any[]>;
  findCount(options: RequestListDTO): Promise<number>;
  save(postObj: object): Promise<any>;
  delete(id: string): Promise<{ deletedCount: number }>;
  update(id: string, putObj: object): Promise<{ matchedCount: number }>;
  processOptionForList(info?: RequestListDTO): object;
  deleteByIdType(id: string): Promise<any>;
  findOneSortBy(input: string): Promise<any>;

  setModel(m: Model<Ischema>);

  setConfigService(c: ConfigService);

  getParsedId(value: any): any;

  getParsedIdStr(value: any): any;

  getParsedString(value: any): any;

  getParsedRegExp(value: any): any;
}