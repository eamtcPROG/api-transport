import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { AttachmentRepository } from 'src/attachment/repositories/attachment.repository';
import ResultDeleteDTO from 'src/app/dto/resultdelete.dto';
import { CommonTools } from 'src/app/tools/commontools';
import IService from 'src/app/interfaces/iservice.interface';
import { GeneralService } from 'src/app/services/general.service';
import Idto from 'src/app/interfaces/idto.interface';
// import { VideoRepository } from 'src/video/repositories/video.repository';
// import { GalleryRepository } from 'src/gallery/repositories/gallery.repository';

import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import RequestListDTO from '../dto/requestlist.dto';
import RequestFilterDTO from '../dto/requestfilter.dto';
import { Status } from '../tools/status';

@Injectable()
export class MediaService {
    constructor(
        // private readonly attachmentRepository: AttachmentRepository,
        // private readonly videoRepository: VideoRepository,
        // private readonly galleryRepository: GalleryRepository,
    ) { }


    async populateObjWithMedia(obj: any, populate?: RequestPopulateDTO): Promise<any> {
        if (!obj) return obj;
        if (!populate) return obj;
        if (!populate.populates) return obj;

        
        // -------------------------------------
        const info = new RequestListDTO();
        info.filters = [];

        let f = new RequestFilterDTO();
        f.field = 'idparent';
        f.values = [];
        f.values.push(obj._id);

        info.filters.push(f);

        f = new RequestFilterDTO();
        f.field = 'status';
        f.values = [];
        f.values.push(Status.ACTIVE.toString());

        info.filters.push(f);
        // -------------------------------------

        info.populate = populate;
        info.populate.addToPopulates(['fileinfo']);

        // if (
        //     populate.populates.indexOf('idattachment') !== -1
        //     || populate.populates.indexOf('media') !== -1
        // ) {
        //         obj.attachment = await this.attachmentRepository.findAll(info);
        // }

        // if (populate.populates.indexOf('idvideo') !== -1
        //     || populate.populates.indexOf('media') !== -1) {
        //         obj.video = await this.videoRepository.findAll(info);
        // }
        // if (populate.populates.indexOf('idgallery') !== -1
        //     || populate.populates.indexOf('media') !== -1) {
        //         obj.gallery = await this.galleryRepository.findAll(info);
        // }
        
        return obj;
    }

}