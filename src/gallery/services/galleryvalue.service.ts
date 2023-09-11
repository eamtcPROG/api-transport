import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GalleryValueRepository } from '../repositories/galleryvalue.repository';
import { GalleryValueDto } from '../dto/galleryvalue.dto';
import { GalleryPopulateDto } from '../dto/gallerypopulate.dto';

import { GalleryValue } from '../schemas/galleryvalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';

import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { GalleryService } from './gallery.service';
import { ResultGalleryDto } from '../dto/resultgallery.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class GalleryValueService
  extends GeneralService<GalleryValueRepository, null>
  implements IService
{
  constructor(
    private readonly galleryValueRepository: GalleryValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => GalleryService))
    private readonly galleryService: GalleryService,
  ) {
    super(galleryValueRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idgallery']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new GalleryValueDto();

    rez.id = this.galleryValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idgallery') && obj.idattachment)
      rez.idgallery = this.galleryValueRepository.getParsedIdStr(obj.idgallery);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.galleryValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;

    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto{
    if (!postObj.idlanguage) return null;

    const obj: GalleryValueDto = new GalleryValueDto();
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    obj.idgallery = id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: GalleryValueDto = new GalleryValueDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idgallery')) obj.idgallery = postObj.idgallery;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new GalleryValueDto();
  //   rez.id = obj._id;
  //   rez.idlanguage = obj.idlanguage;
  //   rez.idgallery = obj.idgallery;
  //   rez.name = obj.name;

  //   return rez;
  // }

  // // UNVERIFIED

  // async add(postObj: GalleryValueDto): Promise<GalleryValueDto> {
  //   const obj = await this.galleryValueRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.galleryValueRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: GalleryValueDto): Promise<GalleryValueDto> {
  //   const obj = await this.galleryValueRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(
  //   input: string,
  //   name: string,
  // ): Promise<GalleryValueDto> {
  //   const rLDTO = new RequestListDTO();
  //   rLDTO.page = 1;
  //   rLDTO.onpage = 1;
  //   rLDTO.filters = [];

  //   const tf = new RequestFilterDTO();
  //   tf.field = 'name';
  //   tf.values = [name];

  //   rLDTO.filters.push(tf);

  //   const tf1 = new RequestFilterDTO();
  //   tf1.field = 'idlanguage';
  //   tf1.values = [input];

  //   rLDTO.filters.push(tf1);

  //   const objects = await this.getAll(rLDTO);

  //   return objects[0];
  // }

  // async getAllPopulate(options: RequestListDTO): Promise<ResultGalleryDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idgallery', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.galleryValueRepository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<ResultGalleryDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idgallery', 'idlanguage'];

  //   const obj = await this.galleryValueRepository.findById(
  //     id,
  //     requestPopulateDTO,
  //   );
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez = new GalleryPopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = await this.galleryService.getById(obj.idgallery);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.name = obj.name;

  //   return this.galleryService.fromPopulateToResult(rez);
  // }

  // async toTypeValuePopulateDtoArray(objs: GalleryPopulateDto[]) {
  //   const rez = new Array<ResultGalleryDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.galleryValueRepository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}