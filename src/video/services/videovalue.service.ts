import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VideoValueRepository } from '../repositories/videovalue.repository';
import { VideoValueDto } from '../dto/videovalue.dto';
import { VideoPopulateDto } from '../dto/videopopulate.dto';

import { VideoValue } from '../schemas/videovalue.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';

import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import RequestFilterDTO from 'src/app/dto/requestfilter.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { LanguageService } from 'src/language/services/language.service';
import { VideoService } from './video.service';
import { ResultVideoDto } from '../dto/resultvideo.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';


@Injectable()
export class VideoValueService
  extends GeneralService<VideoValueRepository, null>
  implements IService
{
  constructor(
    private readonly videoValueRepository: VideoValueRepository,
    protected readonly configService: ConfigService,
    private readonly languageService: LanguageService,
    @Inject(forwardRef(() => VideoService))
    private readonly videoService: VideoService,
  ) {
    super(videoValueRepository);
  }

  getKeys(): any[] {
    const rez = [];
    rez.push(['idlanguage', 'idvideo']);
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new VideoValueDto();

    rez.id = this.videoValueRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idvideo') && obj.idattachment)
      rez.idvideo = this.videoValueRepository.getParsedIdStr(obj.idvideo);
    if (obj.hasOwnProperty('idlanguage'))
      rez.idlanguage = this.videoValueRepository.getParsedIdStr(obj.idlanguage);

    if (obj.hasOwnProperty('name')) rez.name = obj.name;
    if (obj.hasOwnProperty('language')) rez.language = obj.language;
    

    return rez;
  }

  parseForSaveValue(postObj: any, id: string): Idto{
    if (!postObj.hasOwnProperty('idlanguage')) return null;

    const obj: VideoValueDto = new VideoValueDto();
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    obj.idvideo = id;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: VideoValueDto = new VideoValueDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idlanguage')) obj.idlanguage = postObj.idlanguage;
    if (postObj.hasOwnProperty('idvideo')) obj.idvideo = postObj.idvideo;
    if (postObj.hasOwnProperty('name')) obj.name = postObj.name;
    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new VideoValueDto();
  //   rez.id = obj._id;
  //   rez.idlanguage = obj.idlanguage;
  //   rez.idvideo = obj.idvideo;
  //   rez.name = obj.name;

  //   return rez;
  // }

  // // UNVERIFIED

  // async add(postObj: VideoValueDto): Promise<Idto> {
  //   const obj = await this.videoValueRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.videoValueRepository.delete(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: VideoValueDto): Promise<VideoValueDto> {
  //   const obj = await this.videoValueRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // async getLanguageAndName(
  //   input: string,
  //   name: string,
  // ): Promise<VideoValueDto> {
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

  // async getAllPopulate(options: RequestListDTO): Promise<ResultVideoDto[]> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idvideo', 'idlanguage'];
  //   options.populate = requestPopulateDTO;

  //   const objs = await this.videoValueRepository.findAll(options);
  //   if (objs == null) return null;
  //   return await this.toTypeValuePopulateDtoArray(objs);
  // }
  // async findByIdAndPopulate(id: string): Promise<ResultVideoDto> {
  //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
  //   requestPopulateDTO.populates = ['idvideo', 'idlanguage'];

  //   const obj = await this.videoValueRepository.findById(
  //     id,
  //     requestPopulateDTO,
  //   );
  //   if (obj == null) return null;

  //   return await this.toTypeValuePopulateDto(obj);
  // }

  // async toTypeValuePopulateDto(obj) {
  //   const rez = new VideoPopulateDto();
  //   rez.id = obj._id;
  //   rez.typeobject = await this.videoService.getById(obj.idvideo);
  //   rez.language = await this.languageService.getById(obj.idlanguage);
  //   rez.name = obj.name;

  //   return this.videoService.fromPopulateToResult(rez);
  // }

  // async toTypeValuePopulateDtoArray(objs: VideoPopulateDto[]) {
  //   const rez = new Array<ResultVideoDto>();

  //   objs.map(async (item) => {
  //     const obj = await this.toTypeValuePopulateDto(item);
  //     rez.push(obj);
  //   });

  //   return rez;
  // }

  // async deleteByIdType(id: string): Promise<ResultDeleteDTO> {
  //   const obj = await this.videoValueRepository.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }
}