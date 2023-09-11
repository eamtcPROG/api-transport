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
  import { SiteSocialDto } from '../dto/sitesocial.dto';
  import { SiteSocialService } from '../services/sitesocial.service';
  import ResultListDTO from 'src/app/dto/resultlist.dto';
  import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
  import { PostSiteSocialDto } from '../dto/postsitesocial.dto';
  import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
  import {CommonTools} from 'src/app/tools/commontools';
  import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
  
  @ApiTags('admin/sitesocial')
  @Controller('admin/sitesocial')
  @UseGuards(GeneralAdminGuard)
  export class AdminSiteSocialController {
    constructor(private siteSocialService: SiteSocialService) {}
  
    @ApiOperation({ summary: 'Add SiteSocial' })
    @ApiBody({ type: PostSiteSocialDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: SiteSocialDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostSiteSocialDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
      const obj = await this.siteSocialService.save(body);
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.BAD_REQUEST,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Get SiteSocial list' })
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
      req.requestList.populate.addToPopulates(['idtypesocial', 'values']);
      const obj = await this.siteSocialService.getAll(req.requestList);
      
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
      const totalObjects = await this.siteSocialService.getCount(
        req.requestList,
      );
      return await ToolsGenerateResponse.getOkList(
        res,
        obj,
        req.requestList,
        totalObjects,
      );
    }
  
    @ApiOperation({ summary: 'Get SiteSocial by ID' })
    @ApiParam({ name: 'id', description: 'SiteSocial id', required: true })
    @ApiOkResponse({
      type: SiteSocialDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'SiteSocial not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.siteSocialService.getById(params.id,CommonTools.populateObject(['values', 'idtypesocial']));
  
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
    // @Get('/user/:id')
    // public async getByUserId(@Res() res, @Param() params): Promise<ResultObjectDTO> {
  
    //   const obj = await this.siteSocialService.getByFieldList('iduser', params.id, 50, ['values', 'idtypesocial']);
      
    //   if (obj == null) {
    //     return await ToolsGenerateResponse.getErrObject(
    //       res,
    //       HttpStatus.NOT_FOUND,
    //       MessageTypes.OBJECT_NOT_FOUND,
    //     );
    //   }
  
    //   return await ToolsGenerateResponse.getOkObject(res, obj);
    // }
    @ApiOperation({ summary: 'Delete SiteSocial by ID' })
    @ApiParam({ name: 'id', description: 'SiteSocial id', required: true })
    @ApiOkResponse({
      type: ResultObjectDTO,
      description: 'Delete success',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'SiteSocial not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.siteSocialService.delete(params.id);
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
  
    @ApiOperation({ summary: 'Update SiteSocial by ID' })
    @ApiParam({ name: 'id', description: 'SiteSocial id', required: true })
    @ApiBody({ type: PostSiteSocialDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: SiteSocialDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'SiteSocial not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(PostSiteSocialDto))
    public async update(
      @Res() res,
      @Param() params,
      @Body() body,
    ): Promise<ResultObjectDTO> {
      const obj = await this.siteSocialService.save(body,params.id);
  
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
  