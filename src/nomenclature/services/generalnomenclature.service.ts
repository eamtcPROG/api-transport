import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeGenderRepository } from '../repositories/typegender.repository';
import { TypeGenderValueRepository } from '../repositories/typegendervalue.repository';
import { TypeGenderDto } from '../dto/typegender.dto';
import { TypeGender } from '../schemas/typegender.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultTypeDto } from '../dto/resulttype.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import { AddNomenclatureDto } from 'src/nomenclature/dto/addnomenclature.dto';
import { NomenclatureDto } from 'src/nomenclature/dto/nomenclature.dto';
import { TypeGenderValueDto } from '../dto/typegendervalue.dto';
import { PostGeneralNomenclatureValueDto } from '../dto/postgeneralnomenclaturevalue.dto';
import { TypeGenderValueService } from './typegendervalue.service';
import GeneralNomenclatureDto from '../dto/generalnomenclature.dto';
import GeneralNomenclatureValueDto from '../dto/generalnomenclaturevalue.dto';
import { ModelInterface } from '../interfaces/model.interface';
import { RepositoryInterface } from '../interfaces/repository.interface';
import { ServiceValueInterface } from '../interfaces/servicevalue.interface';
import { GeneralNomenclatureSchema } from '../schemas/generalnomenclature.schema';
import { GeneralNomenclatureValueService } from './generalnomenclaturevalue.service';
import { TypePopulateDto } from '../dto/typepopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

@Injectable()
export abstract class GeneralNomenclatureService<
    Repo extends RepositoryInterface,
    Service extends IService,
  >
  extends GeneralService<Repo, Service>
  implements IService
{
  constructor(
    protected readonly repository: Repo,
    protected readonly service: Service,
  ) {
    super(repository,service);
  }

  getKeys(): any[] {
    const rez = [];
    
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new GeneralNomenclatureDto();

    rez.id = this.repository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('ordercriteria')) rez.ordercriteria = obj.ordercriteria;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;

    // console.log(obj);
    if (obj.hasOwnProperty('objectvalues')) rez.objectvalues = obj.objectvalues;
    if (obj.hasOwnProperty('_values'))
    {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;
      if (obj._values.hasOwnProperty('name')) rez.name = obj._values.name;
    }

    if (obj.hasOwnProperty('attachment') && obj.attachment) rez.attachment = obj.attachment;
    if (obj.hasOwnProperty('video') && obj.video) rez.video = obj.video;
    if (obj.hasOwnProperty('gallery') && obj.gallery) rez.gallery = obj.gallery;
    
    return rez;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: GeneralNomenclatureDto = new GeneralNomenclatureDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('ordercriteria')) obj.ordercriteria = postObj.ordercriteria;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;

    return obj;
  }

  // toDto(obj: any) {
  //   const rez = new GeneralNomenclatureDto();
  //   rez.id = obj._id;
  //   rez.ordercriteria = obj.ordercriteria;
  //   rez.status = obj.status;

  //   return rez;
  // }

  // // UNVERIFIED

  // prepareToAdd(obj: AddNomenclatureDto): NomenclatureDto {
  //   const nomenclatureDto = new NomenclatureDto();

  //   const objectType = new TypeGenderDto();
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.status = obj.status;

  //   nomenclatureDto.type = objectType;

  //   const objectValue = new PostGeneralNomenclatureValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   nomenclatureDto.value = objectValue;
  //   return nomenclatureDto;
  // }

  // async addTypeWithValue(obj: AddNomenclatureDto): Promise<TypePopulateDto> {
  //   const objects = this.prepareToAdd(obj);
  //   const checkDuplicate = await this.service.getLanguageAndName(
  //     objects.value.idlanguage,
  //     objects.value.name,
  //   );
  //   if (checkDuplicate != null) return null;

  //   let typeObj;
  //   if (obj.idtype == undefined || obj.idtype == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idtype, objects.type);
  //   }

  //   const valueObjToAdd: PostGeneralNomenclatureValueDto =
  //     new PostGeneralNomenclatureValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.name = objects.value.name;
  //   valueObjToAdd.idtype = typeObj.id;

  //   const valueObj = await this.Service.save(valueObjToAdd);

  //   const result = this.toTypeResult(typeObj, valueObj);
  //   const rez = await this.service.findByIdAndPopulate(result.idvalue);
  //   return rez;
  // }

  // toTypeResult(
  //   tObj: GeneralNomenclatureDto,
  //   vObj: GeneralNomenclatureValueDto,
  // ): ResultTypeDto {
  //   const result = new ResultTypeDto();
  //   result.idlanguage = vObj.idlanguage;
  //   result.name = vObj.name;
  //   result.ordercriteria = tObj.ordercriteria;
  //   result.status = tObj.status;
  //   result.id = tObj.id;
  //   result.idvalue = vObj.id;
  //   return result;
  // }

  // async add(postObj: object): Promise<any> {
  //   const obj = await this.repository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj = await this.service.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idtype;
  //   const obj = await this.repository.delete(id);
  //   await this.service.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<any> {
  //   const obj = await this.repository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // prepareToUpdate(obj: ResultTypeDto): NomenclatureDto {
  //   const nomenclatureDto = new NomenclatureDto();

  //   const objectType = new GeneralNomenclatureDto();
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.status = obj.status;

  //   nomenclatureDto.type = objectType;

  //   const objectValue = new PostGeneralNomenclatureValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   nomenclatureDto.value = objectValue;
  //   return nomenclatureDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultTypeDto,
  // ): Promise<TypePopulateDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.service.save(objects.value, id);

  //   const objT = await this.update(obj.id, objects.type);
  //   if (objV == null || objT == null) return null;
  //   const result = this.toTypeResult(objT, objV);
  //   const rez = await this.service.findByIdAndPopulate(result.idvalue);
  //   return rez;
  // }
}