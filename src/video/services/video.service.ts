import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VideoRepository } from '../repositories/video.repository';
import { VideoDto } from '../dto/video.dto';
import { Video } from '../schemas/video.schema';
import RequestListDTO from 'src/app/dto/requestlist.dto';
import { ResultVideoDto } from '../dto/resultvideo.dto';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';


import { VideoValueDto } from '../dto/videovalue.dto';
import { VideoValueService } from './videovalue.service';
import { LinkVideoDto } from '../dto/linkvideo.dto';
import { PostVideoDto } from '../dto/postvideo.dto';
import { VideoPopulateDto } from '../dto/videopopulate.dto';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';

import * as URL from 'url-parse';
import { ParsedVideoDto } from '../dto/parsedvideo.dto';


@Injectable()
export class VideoService
  extends GeneralService<VideoRepository, VideoValueService>
  implements IService
{
  constructor(
    private readonly videoRepository: VideoRepository,
    protected readonly configService: ConfigService,
    @Inject(forwardRef(() => VideoValueService))
    private readonly videoValueService: VideoValueService,
  ) {
    super(videoRepository, videoValueService);
  }

  getKeys(): any[] {
    const rez = [];
    
    return rez;
  }

  async parseVideoUrl(videolocation: string): Promise<ParsedVideoDto> {

    const rez = new ParsedVideoDto;
    rez.videolocation = videolocation;

    const parsedUrl = new URL(videolocation, true);
    
    if (parsedUrl.hostname === 'www.youtube.com' && parsedUrl.query.v) {
      rez.videoserver = 'youtube';
      rez.videoid = parsedUrl.query.v;
      return rez;
    } else if (parsedUrl.hostname === 'vimeo.com') {
      const segments = parsedUrl.pathname.split('/');
      const videoId = segments[segments.length - 1];

      rez.videoserver = 'vimeo';
      rez.videoid = videoId;
      return rez;
    } 
    
    return rez;
  }

  toDto(obj: any): Idto {
    const rez = new VideoDto();

    rez.id = this.videoRepository.getParsedIdStr(obj._id);
    if (obj.hasOwnProperty('idfile'))
      rez.idfile = this.videoRepository.getParsedIdStr(obj.idfile);
    if (obj.hasOwnProperty('isdefault')) rez.isdefault = obj.isdefault;
    if (obj.hasOwnProperty('ordercriteria')) rez.ordercriteria = obj.ordercriteria;
    if (obj.hasOwnProperty('status')) rez.status = obj.status;
    if (obj.hasOwnProperty('idparent')) rez.idparent = obj.idparent;
    if (obj.hasOwnProperty('parent')) rez.parent = obj.parent;

    if (obj.hasOwnProperty('videolocation')) rez.videolocation = obj.videolocation;
    if (obj.hasOwnProperty('videoserver')) rez.videoserver = obj.videoserver;
    if (obj.hasOwnProperty('videoid')) rez.videoid = obj.videoid;

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

 convertFromBody(body: any, parsedVideo:ParsedVideoDto): Idto {
   const obj: VideoDto = new VideoDto();

   if (body && 'id' in body) obj.id = body.id;
   if (body && 'status' in body) obj.status = body.status;
   if (body && 'ordercriteria' in body) obj.ordercriteria = body.ordercriteria;
   if (body && 'idfile' in body) obj.idfile = body.idfile;
   if (body && 'parent' in body) obj.parent = body.parent;
   if (body && 'idparent' in body) obj.idparent = body.idparent;
   if (body && 'isdefault' in body) obj.isdefault = body.isdefault;

   if (body && 'idlanguage' in body) obj.idlanguage = body.idlanguage;
   if (body && 'name' in body) obj.name = body.name;

   obj.videolocation = parsedVideo.videolocation;
   obj.videoserver = parsedVideo.videoserver;
   obj.videoid = parsedVideo.videoid;
   
    return obj;
  }

 async parseForSave(postObj: any): Promise<Idto> {
    const obj: VideoDto = new VideoDto();
    if (postObj.hasOwnProperty('id')) obj.id = postObj.id;
    if (postObj.hasOwnProperty('idfile')) obj.idfile = postObj.idfile;
    if (postObj.hasOwnProperty('status')) obj.status = postObj.status;
    if (postObj.hasOwnProperty('isdefault')) obj.isdefault = postObj.isdefault;
    if (postObj.hasOwnProperty('ordercriteria')) obj.ordercriteria = postObj.ordercriteria;
    if (postObj.hasOwnProperty('idparent')) obj.idparent = postObj.idparent;
   if (postObj.hasOwnProperty('parent')) obj.parent = postObj.parent;

   if (postObj.hasOwnProperty('videolocation')) obj.videolocation = postObj.videolocation;
   if (postObj.hasOwnProperty('videoserver')) obj.videoserver = postObj.videoserver;
   if (postObj.hasOwnProperty('videoid')) obj.videoid = postObj.videoid;
   
    return obj;
  }

  // toDto(obj: any): Idto {
  //   const rez = new VideoDto();
  //   rez.id = obj._id;
  //   rez.status = obj.status;
  //   rez.idfile = obj.idfile;
  //   rez.isdefault = obj.isdefault;
  //   rez.ordercriteria = obj.ordercriteria;
  //   rez.idparent = obj.idparent;

  //   return rez;
  // }

  // UNVERIFIED

  // prepareToAdd(obj: PostVideoDto): LinkVideoDto {
  //   const linkVideoDto = new LinkVideoDto();

  //   const objectType = new VideoDto();

  //   objectType.status = obj.status;
  //   objectType.idfile = obj.idfile;
  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.isdefault = obj.isdefault;
  //   objectType.idparent = obj.idparent != undefined ? obj.idparent : '';

  //   linkVideoDto.type = objectType;

  //   const objectValue = new VideoValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;

  //   linkVideoDto.value = objectValue;
  //   return linkVideoDto;
  // }

  // fromPopulateToResult(obj: VideoPopulateDto): ResultVideoDto {
  //   const result: ResultVideoDto = new ResultVideoDto();

  //   result.language = obj.language.name;
  //   result.idlanguage = obj.language.id;
  //   result.name = obj.name;

  //   result.status = obj.typeobject.status;
  //   result.id = obj.id;
  //   result.idvideo = obj.typeobject.id;

  //   result.isdefault = obj.typeobject.isdefault;
  //   result.idfile = obj.typeobject.idfile;
  //   result.ordercriteria = obj.typeobject.ordercriteria;
  //   result.idparent = obj.typeobject.idparent;

  //   return result;
  // }

  // async addTypeWithValue(obj: PostVideoDto): Promise<ResultVideoDto> {
  //   const objects = this.prepareToAdd(obj);
  //   // const checkDuplicate = await this.videoValueService.getLanguageAndName(objects.value.idlanguage, objects.value.name);
  //   // if (checkDuplicate != null) return null;

  //   let typeObj;
  //   if (obj.idvideo == undefined || obj.idvideo == '') {
  //     typeObj = await this.add(objects.type);
  //   } else {
  //     typeObj = await this.update(obj.idvideo, objects.type);
  //   }

  //   const valueObjToAdd: VideoValueDto = new VideoValueDto();

  //   valueObjToAdd.idlanguage = objects.value.idlanguage;
  //   valueObjToAdd.name = objects.value.name;
  //   valueObjToAdd.idvideo = typeObj.id;

  //   const valueObj = await this.videoValueService.save(valueObjToAdd);

  //   const result = this.toTypeResult(typeObj, valueObj);
  //   const rez = await this.videoValueService.findByIdAndPopulate(result.id);
  //   return rez;
  // }

  // toTypeResult(tObj: VideoDto, vObj: VideoValueDto): ResultVideoDto {
  //   const result: ResultVideoDto = new ResultVideoDto();

  //   result.idlanguage = vObj.idlanguage;
  //   result.name = vObj.name;

  //   result.status = tObj.status;
  //   result.id = vObj.id;
  //   result.idvideo = tObj.id;
  //   result.isdefault = tObj.isdefault;
  //   result.idfile = tObj.idfile;
  //   result.ordercriteria = tObj.ordercriteria;
  //   result.idparent = tObj.idparent;

  //   return result;
  // }

  // async add(postObj: object): Promise<VideoDto> {
  //   const obj = await this.videoRepository.save(postObj);

  //   return this.toDto(obj);
  // }

  // async delete(id: string): Promise<ResultDeleteDTO> {
  //   const typeValueObj = await this.videoValueService.getById(id);
  //   if (typeValueObj == null) return CommonTools.toDeleteResult(false);
  //   id = typeValueObj.idvideo;
  //   const obj = await this.videoRepository.delete(id);
  //   await this.videoValueService.deleteByIdType(id);

  //   if (obj.deletedCount === 0) return CommonTools.toDeleteResult(false);
  //   return CommonTools.toDeleteResult(true);
  // }

  // async update(id: string, putObj: object): Promise<VideoDto> {
  //   const obj = await this.videoRepository.update(id, putObj);
  //   if (obj.matchedCount === 0) return null;
  //   const objUpdated = await this.getById(id);

  //   return objUpdated;
  // }

  // prepareToUpdate(obj: ResultVideoDto): LinkVideoDto {
  //   const videoDto = new LinkVideoDto();

  //   const objectType = new VideoDto();

  //   objectType.status = obj.status;
  //   objectType.idfile = obj.idfile;

  //   objectType.ordercriteria = obj.ordercriteria;
  //   objectType.isdefault = obj.isdefault;
  //   objectType.idparent = obj.idparent != undefined ? obj.idparent : '';

  //   videoDto.type = objectType;

  //   const objectValue = new VideoValueDto();
  //   objectValue.idlanguage = obj.idlanguage;
  //   objectValue.name = obj.name;
  //   objectValue.idvideo = obj.idvideo;

  //   videoDto.value = objectValue;

  //   return videoDto;
  // }

  // async updateTypeWithLabel(
  //   id: string,
  //   obj: ResultVideoDto,
  // ): Promise<ResultVideoDto> {
  //   const objects = this.prepareToUpdate(obj);

  //   const objV = await this.videoValueService.save(objects.value, id);

  //   const objT = await this.update(obj.idvideo, objects.type);

  //   if (objV == null || objT == null) return null;
  //   // const result = this.toTypeResult(objT, objV);
  //   const rez = await this.videoValueService.findByIdAndPopulate(id);
  //   return rez;
  // }
}