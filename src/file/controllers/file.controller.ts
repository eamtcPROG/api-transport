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
  Patch,
  UploadedFile,
  StreamableFile,
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
import { FileDto } from '../dto/file.dto';
import { FileService } from '../services/file.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostFileDto } from '../dto/postfile.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { AddPermissionDto } from '../dto/addpermission.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentResponse } from '@slynova/flydrive';
import { Readable } from 'stream';

import { Response } from 'express';

@ApiTags('file')
@Controller('file')
@UseGuards(GeneralAdminGuard)
export class FileController {
  constructor(private fileService: FileService) { }

  @ApiOperation({ summary: 'Add File' })
  @ApiBody({
    description: 'File upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: FileDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @Post('/public/test')
  @UseInterceptors(FileInterceptor('file'))
  public async add(@Res() res, @UploadedFile() file): Promise<ResultObjectDTO> {

    const obj = await this.fileService.storePublic(file);
    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.BAD_REQUEST,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }


    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get File list' })
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
    const obj = await this.fileService.getAll(req.requestList);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.fileService.getCount(
      req.requestList,
    );
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get File by ID' })
  @ApiParam({ name: 'id', description: 'File id', required: true })
  @ApiOkResponse({
    type: FileDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'File not found',
  })
  @Get('/:id')
  public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.fileService.getById(params.id);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get File by ID' })
  @ApiParam({ name: 'id', description: 'File id', required: true })
  @Get('/object/:id/:description?')
  public async getObject(@Res() res: Response, @Param() params): Promise<StreamableFile> {
    const obj:FileDto = await this.fileService.getById(params.id) as FileDto;

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    let fileContent: any = await this.fileService.getFileStream(this.fileService.toDiskType(obj.storage), obj.location);
    
    if (fileContent == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    
      res.setHeader('Content-Type', obj.type);
    res.setHeader('Content-Disposition', `inline; filename=${obj.name}`);
    
    fileContent.pipe(res);
  }

  @ApiOperation({ summary: 'Delete File by ID' })
  @ApiParam({ name: 'id', description: 'File id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'File not found',
  })
  @Delete('/:id')
  public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.fileService.discardFile(params.id);
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

  @ApiOperation({ summary: 'Update File by ID' })
  @ApiParam({ name: 'id', description: 'File id', required: true })
  @ApiBody({ type: PostFileDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: FileDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'File not found',
  })
  @Put('/:id')
  @UseInterceptors(new PrepareObjectBody(PostFileDto))
  public async update(
    @Res() res,
    @Param() params,
    @Body() body,
  ): Promise<ResultObjectDTO> {
    const obj = await this.fileService.save(body, params.id);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Add File permission by ID' })
  @ApiParam({ name: 'id', description: 'File id', required: true })
  @ApiBody({ type: AddPermissionDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: FileDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'File not found',
  })
  @Patch('/permission/:id')
  @UseInterceptors(new PrepareObjectBody(AddPermissionDto))
  public async addPermission(
    @Res() res,
    @Param() params,
    @Body() body,
  ): Promise<ResultObjectDTO> {
    const obj = await this.fileService.addPermission(params.id, body);

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
