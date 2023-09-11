import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseInterceptors,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Query,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import ResultObjectDTO from 'src/app/dto/resultobject.dto';
import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
import { MessageTypes } from 'src/app/tools/messagetypes';
import { GalleryDto } from '../dto/gallery.dto';
import { GalleryService } from '../services/gallery.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostGalleryDto } from '../dto/postgallery.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { CommonTools } from 'src/app/tools/commontools';
import { ResultGalleryDto } from '../dto/resultgallery.dto';
import { GalleryValueService } from '../services/galleryvalue.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/services/file.service';
import { DiskType, StorageEntityType } from 'src/file/tools/disk';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';

@ApiTags('admin/gallery')
@Controller('admin/gallery')
@UseGuards(GeneralAdminGuard)
export class AdminGalleryController {
  constructor(
    private galleryService: GalleryService,
    private galleryValueService: GalleryValueService,
    
    private fileService: FileService,
  ) {}

  @ApiOperation({ summary: 'Add Gallery' })
  @ApiBody({ type: PostGalleryDto })
  // @ApiConsumes('application/json')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: ResultGalleryDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @Post('/')
  @UseInterceptors(FileInterceptor('files'))
  @UseInterceptors(new PrepareObjectBody(PostGalleryDto))
  public async add(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: PostGalleryDto,
    @Res() res,
  ): Promise<ResultObjectDTO> {    
      const fileInfo = await this.fileService.storeFileAndGetId(
          DiskType.public,
          StorageEntityType.gallery,
          body.parent + "/" + body.idparent,
          file,
    );
    
    const postObj:GalleryDto =this.galleryService.convertFromBody(body, fileInfo) as GalleryDto;
      
    const obj = await this.galleryService.save(postObj);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.BAD_REQUEST,
        MessageTypes.OBJECT_FOUND,
      );
    }

    // const populate: RequestPopulateDTO = new RequestPopulateDTO();
    // populate.addToPopulates();
    // const objr: any = await this.galleryRepository.findById(obj.id, populate);

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get Gallery list' })
  @ApiOkResponse({
    type: ResultListDTO,
    description: 'Result List in type: ResultListDTO',
  })
  @ApiQuery({
    name: 'page',
    type: 'integer',
    description: 'Page number, default: 1',
    required: false,
  })
  @ApiQuery({
    name: 'onpage',
    type: 'integer',
    description: 'Elements on page',
    required: false,
  })
  @ApiQuery({
    name: 'filters',
    type: 'string',
    description: 'Filters',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    type: 'string',
    description: 'Field for ordering',
    required: false,
  })
  @Get('/')
  @UseInterceptors(ParseParamsList)
  public async getList(
    @Res() res,
    @Param() params,
    @Req() req,
  ): Promise<ResultListDTO> {
    req.requestList.populate.addToPopulates(['values', 'fileinfo']);
    const obj = await this.galleryService.getAll(req.requestList);
    

    console.error(obj);

    // const obj = await this.galleryValueService.getAllPopulate(req.requestList);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.galleryService.getCount(req.requestList);
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get Gallery by ID' })
  @ApiParam({ name: 'id', description: 'Gallery id', required: true })
  @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
  @ApiOkResponse({
    type: GalleryDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Gallery not found',
  })
  @Get('/:id')
  public async get(
    @Res() res,
    @Param() params,
    @Query('idlanguage') idlanguage?: string,
  ): Promise<ResultObjectDTO> {
    let obj = null;
    if (idlanguage == undefined)
      obj = await this.galleryService.getById(
        params.id,
        CommonTools.populateObject(['fileinfo', 'values', 'idlanguage']),
      );
    else
      obj = await this.galleryService.getById(
        params.id,
        CommonTools.populateObject(['fileinfo', 'values', 'idlanguage']),
        idlanguage,
      );
    // const obj = await this.galleryValueService.findByIdAndPopulate(params.id);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Delete Gallery by ID' })
  @ApiParam({ name: 'id', description: 'Gallery id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Gallery not found',
  })
  @Delete('/:id')
  public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.galleryService.delete(params.id);
    if (obj.deleted === false) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getSuccessObject(
      res,
      HttpStatus.OK,
      MessageTypes.OBJECT_DELETE_SUCCESS,
    );
  }

  @ApiOperation({ summary: 'Update Gallery by ID' })
  @ApiParam({ name: 'id', description: 'Gallery id', required: true })
  @ApiBody({ type: ResultGalleryDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: ResultGalleryDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Gallery not found',
  })
  @Put('/:id')
  @UseInterceptors(new PrepareObjectBody(ResultGalleryDto))
  public async update(
    @Res() res,
    @Param() params,
    @Body() body,
  ): Promise<ResultObjectDTO> {
    const obj = await this.galleryService.save(body, params.id);

    console.log("updateupdateupdateupdateupdateupdateupdateupdate", body, params.id);
    
    
    // const postObj:GalleryDto =this.galleryService.convertFromBody(body, fileInfo) as GalleryDto;
      
    // const obj = await this.galleryService.save(postObj);


    //   const obj = await this.galleryService.updateTypeWithLabel(
    //     params.id,
    //     body,
    //   );

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }
}
