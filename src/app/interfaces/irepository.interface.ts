import { Model } from "mongoose";
import RequestListDTO from "src/app/dto/requestlist.dto";
import Ischema from "src/app/interfaces/ischema.interface";
import RequestPopulateDTO from "src/app/dto/requestpopulate.dto";
import { ConfigService } from "@nestjs/config";

export default interface IRepository {
  findAll(info?: RequestListDTO): Promise<any[]>;

  processAgregateForList(
    _model: Model<Ischema>,
    options: object,
    info?: RequestListDTO,
    forCount?: boolean,
  ): any;
  processOptionForList(info?: RequestListDTO): object;

  populateObj(obj: any, populate?: RequestPopulateDTO, idLanguage?: string): Promise<any>;


  findById(id: string, populate?: RequestPopulateDTO, idLanguage?: string): Promise<any>;

  setModel(m: Model<Ischema>);

  setConfigService(c: ConfigService);

  getParsedId(value: any): any;

  getParsedIdStr(value: any): any;

  getParsedString(value: any): any;

  getParsedRegExp(value: any): any;
}
