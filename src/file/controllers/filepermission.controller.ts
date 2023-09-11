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
  import { FilePermissionDto } from '../dto/filepermission.dto';
  import { FilePermissionService } from '../services/filepermission.service';
  import ResultListDTO from 'src/app/dto/resultlist.dto';
  import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
  import { PostFilePermissionDto } from '../dto/postfilepermission.dto';
  import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
  import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
  
  @ApiTags('filepermission')
  @Controller('filepermission')
  @UseGuards(GeneralAdminGuard)
  export class FilePermissionController {
    constructor(private filePermissionService: FilePermissionService) {}
  
    @ApiOperation({ summary: 'Add FilePermission' })
    @ApiBody({ type: PostFilePermissionDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: FilePermissionDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostFilePermissionDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
      const obj = await this.filePermissionService.save(body);
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.BAD_REQUEST,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Get FilePermission list' })
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
      const obj = await this.filePermissionService.getAll(req.requestList);
      
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
      const totalObjects = await this.filePermissionService.getCount(
        req.requestList,
      );
      return await ToolsGenerateResponse.getOkList(
        res,
        obj,
        req.requestList,
        totalObjects,
      );
    }
  
    @ApiOperation({ summary: 'Get FilePermission by ID' })
    @ApiParam({ name: 'id', description: 'FilePermission id', required: true })
    @ApiOkResponse({
      type: FilePermissionDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'FilePermission not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.filePermissionService.getById(params.id);
  
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Delete FilePermission by ID' })
    @ApiParam({ name: 'id', description: 'FilePermission id', required: true })
    @ApiOkResponse({
      type: ResultObjectDTO,
      description: 'Delete success',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'FilePermission not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.filePermissionService.delete(params.id);
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
  
    @ApiOperation({ summary: 'Update FilePermission by ID' })
    @ApiParam({ name: 'id', description: 'FilePermission id', required: true })
    @ApiBody({ type: PostFilePermissionDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: FilePermissionDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'FilePermission not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(PostFilePermissionDto))
    public async update(
      @Res() res,
      @Param() params,
      @Body() body,
    ): Promise<ResultObjectDTO> {
      const obj = await this.filePermissionService.save(body, params.id);
  
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
  