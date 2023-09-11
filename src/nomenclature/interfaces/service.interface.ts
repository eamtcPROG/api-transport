import RequestListDTO from 'src/app/dto/requestlist.dto';
import { NomenclatureDto } from 'src/nomenclature/dto/nomenclature.dto';
import { AddNomenclatureDto } from 'src/nomenclature/dto/addnomenclature.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { ResultTypeDto } from '../dto/resulttype.dto';
import GeneralNomenclatureDto from '../dto/generalnomenclature.dto';
import GeneralNomenclatureValueDto from '../dto/generalnomenclaturevalue.dto';
import { PostGeneralNomenclatureValueDto } from '../dto/postgeneralnomenclaturevalue.dto';
import { TypePopulateDto } from '../dto/typepopulate.dto';

export interface ServiceInterface {
    // toDto(obj: any): GeneralNomenclatureDto;
    // prepareToAdd(obj: AddNomenclatureDto): NomenclatureDto;
    // addTypeWithValue(obj: AddNomenclatureDto): Promise<TypePopulateDto>;
    // toTypeResult(tObj:GeneralNomenclatureDto,vObj:GeneralNomenclatureValueDto): ResultTypeDto;
    // toDtoArray(objs: any[]): any[];
    // getById(id: string): Promise<any>;
    // getAll(options: RequestListDTO): Promise<any[]>;
    // getCount(options: RequestListDTO): Promise<number>;
    // add(postObj: object): Promise<any>;
    // delete(id: string): Promise<ResultDeleteDTO>;
    // update(id: string, putObj: object): Promise<any>;
    // prepareToUpdate(obj: ResultTypeDto): NomenclatureDto;
    // updateTypeWithLabel(id:string,obj: ResultTypeDto):Promise<TypePopulateDto>;
}
