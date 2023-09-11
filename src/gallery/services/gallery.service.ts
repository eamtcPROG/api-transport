import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GalleryRepository } from '../repositories/gallery.repository';
import { GalleryDto } from '../dto/gallery.dto';
import { Gallery } from '../schemas/gallery.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultGalleryDto } from '../dto/resultgallery.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';


import { GalleryValueDto } from '../dto/galleryvalue.dto';
import { GalleryValueService } from './galleryvalue.service';
import { LinkGalleryDto } from '../dto/linkgallery.dto';
import { PostGalleryDto } from '../dto/postgallery.dto';
import { GalleryPopulateDto } from '../dto/gallerypopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class GalleryService
  extends GeneralService<GalleryRepository, GalleryValueService>
  implements IService
{
  constructor(
    private readonly galleryRepository: GalleryRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => GalleryValueService))
    private readonly galleryValueService: GalleryValueService,
  ) {
    super(galleryRepository,galleryValueService);
  }
  getKeys(): any[] {
    const rez = [];
    
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new GalleryDto();

    rez.id = this.galleryRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idfile')) rez.idfile = this.galleryRepository.getParsedIdStr(obj.idfile); 
    if (obj.hasOwnProperty('isdefault')) rez.isdefault = obj.isdefault;
    if (obj.hasOwnProperty('ordercriteria')) rez.ordercriteria = obj.ordercriteria;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('idparent')) rez.idparent = obj.idparent;
    if (obj.hasOwnProperty('parent')) rez.parent = obj.parent;

    if (obj.hasOwnProperty('fileInfoObj')) rez.fileInfoObj = obj.fileInfoObj;

    if (obj.hasOwnProperty('allvalues')) rez.allvalues = obj.allvalues;
    if (obj.hasOwnProperty('_values'))
    {
      if (obj._values.hasOwnProperty('idlanguage')) rez.idlanguage = obj._values.idlanguage;
      if (obj._values.hasOwnProperty('name')) rez.name = obj._values.name;
      if (obj._values.hasOwnProperty('language')) rez.language = obj._values.language;
    }
    return rez;
  }

 convertFromBody(body: any, idfile:any): Idto {
   const obj: GalleryDto = new GalleryDto();

   if (body && 'id' in body) obj.id = body.id;
   if (idfile) {
     obj.idfile = idfile;
   } 
   else {
   if (body && 'idfile' in body) obj.idfile = body.idfile;
   }
   if (body && 'status' in body) obj.status = body.status;
   if (body && 'isdefault' in body) obj.isdefault = body.isdefault;
   if (body && 'ordercriteria' in body) obj.ordercriteria = body.ordercriteria;
   if (body && 'idparent' in body) obj.idparent = body.idparent;
   if (body && 'parent' in body) obj.parent = body.parent;

   if (body && 'idlanguage' in body) obj.idlanguage = body.idlanguage;
   if (body && 'name' in body) obj.name = body.name;
  
    return obj;
  }

  async parseForSave(postObj: any): Promise<Idto> {
    const obj: GalleryDto = new GalleryDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idfile')) obj.idfile = postObj.idfile;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('isdefault')) obj.isdefault = postObj.isdefault;
    if (postObj.hasOwnProperty('ordercriteria')) obj.ordercriteria = postObj.ordercriteria;
    if (postObj.hasOwnProperty('idparent')) obj.idparent = postObj.idparent;
    if (postObj.hasOwnProperty('parent')) obj.parent = postObj.parent;
    return obj;
  }
  // toDto(obj: any): Idto {
  //   const rez = new GalleryDto();
  //   rez.id = obj._id;
  //   rez.status = obj.status;
  //   rez.idfile = obj.idfile;
  //   rez.isdefault = obj.isdefault;
  //   rez.ordercriteria = obj.ordercriteria;
  //   rez.idparent = obj.idparent;

  //   return rez;
  // }

  // // UNVERIFIED

  // prepareToAdd(obj: PostGalleryDto): LinkGalleryDto {
  //   const linkGalleryDto = new LinkGalleryDto();

  //   const objectType = new GalleryDto();

  //   objectType.status = obj.status;
  //   objectType.idfile = obj.idfile;
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.isdefault = obj.isdefault;
  //   objectType.idparent = obj.idparent != undefined ? obj.idparent : '';

  //   linkGalleryDto.type = objectType;

  //   const objectValue = new GalleryValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   linkGalleryDto.value = objectValue;
  //   return linkGalleryDto;
  // }

  // async addTypeWithValue(obj: PostGalleryDto): Promise<ResultGalleryDto> {
  //   const objects = this.prepareToAdd(obj);
  //   // const checkDuplicate = await this.galleryValueService.getLanguageAndName(objects.value.idlanguage, objects.value.name);
  //   // if (checkDuplicate != null) return null;

  //   let typeObj;
  //   if (obj.idgallery == undefined || obj.idgallery == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idgallery, objects.type);
  //   }

  //   const valueObjToAdd: GalleryValueDto = new GalleryValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.name = objects.value.name;
  //   valueObjToAdd.idgallery = typeObj.id;

  //   const valueObj = await this.galleryValueService.save(valueObjToAdd);

  //   const result = this.toTypeResult(typeObj, valueObj);
  //   const rez = await this.galleryValueService.findByIdAndPopulate(result.id);
  //   return rez;
  // }

  // toTypeResult(tObj: GalleryDto, vObj: GalleryValueDto): ResultGalleryDto {
  //   const result: ResultGalleryDto = new ResultGalleryDto();

  //   result.idlanguage = vObj.idlanguage;
  //   result.name = vObj.name;

  //   result.status = tObj.status;
  //   result.id = vObj.id;
  //   result.idgallery = tObj.id;
  //   result.isdefault = tObj.isdefault;
  //   result.idfile = tObj.idfile;
  //   result.ordercriteria = tObj.ordercriteria;
  //   result.idparent = tObj.idparent;

  //   return result;
  // }

  // fromPopulateToResult(obj: GalleryPopulateDto): ResultGalleryDto {
  //   const result: ResultGalleryDto = new ResultGalleryDto();

  //   result.language = obj.language.name;
  //   result.idlanguage = obj.language.id;
  //   result.name = obj.name;

  //   result.status = obj.typeobject.status;
  //   result.id = obj.id;
  //   result.idgallery = obj.typeobject.id;

  //   result.isdefault = obj.typeobject.isdefault;
  //   result.idfile = obj.typeobject.idfile;
  //   result.ordercriteria = obj.typeobject.ordercriteria;
  //   result.idparent = obj.typeobject.idparent;

  //   return result;
  // }

  // async add(postObj: object): Promise<GalleryDto> {
  //   const obj = await this.galleryRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj = await this.galleryValueService.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idgallery;
  //   const obj = await this.galleryRepository.delete(id);
  //   await this.galleryValueService.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<GalleryDto> {
  //   const obj = await this.galleryRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // prepareToUpdate(obj: ResultGalleryDto): LinkGalleryDto {
  //   const galleryDto = new LinkGalleryDto();

  //   const objectType = new GalleryDto();

  //   objectType.status = obj.status;
  //   objectType.idfile = obj.idfile;

  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.isdefault = obj.isdefault;
  //   objectType.idparent = obj.idparent != undefined ? obj.idparent : '';

  //   galleryDto.type = objectType;

  //   const objectValue = new GalleryValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;
  //   objectValue.idgallery = obj.idgallery;

  //   galleryDto.value = objectValue;

  //   return galleryDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultGalleryDto,
  // ): Promise<ResultGalleryDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.galleryValueService.save(objects.value, id);

  //   const objT = await this.update(obj.idgallery, objects.type);

  //   if (objV == null || objT == null) return null;
  //   // const result = this.toTypeResult(objT, objV);

  //   const rez = await this.galleryValueService.findByIdAndPopulate(id);
  //   return rez;
  // }
}