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
  // import { UserSettingsDto } from '../dto/usersettings.dto';
  import { UserSettingsService } from '../services/usersettings.service';
  import ResultListDTO from 'src/app/dto/resultlist.dto';
  import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
  // import { PostUserSettingsDto } from '../dto/postusersettings.dto';
  import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
  
  import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { CommonTools } from 'src/app/tools/commontools';
  
  @ApiTags('admin/usersettings')
  @Controller('admin/usersettings')
  @UseGuards(GeneralAdminGuard)
  export class AdminUserSettingsController {
    constructor(private userSettingsService: UserSettingsService) {}
  
    @ApiOperation({ summary: 'Add UserSettings' })
    // @ApiBody({ type: PostUserSettingsDto })
    @ApiConsumes('application/json')
    // @ApiOkResponse({
    //   type: UserSettingsDto,
    //   description: 'Special obj in type: ResultObjectDTO',
    // })
    @Post('/')
    // @UseInterceptors(new PrepareObjectBody(PostUserSettingsDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
      const obj = await this.userSettingsService.save(body);
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.BAD_REQUEST,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Get UserSettings list' })
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
      
      const obj = await this.userSettingsService.getAll(req.requestList);
      
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
      const totalObjects = await this.userSettingsService.getCount(
        req.requestList,
      );
      return await ToolsGenerateResponse.getOkList(
        res,
        obj,
        req.requestList,
        totalObjects,
      );
    }
  
    @ApiOperation({ summary: 'Get UserSettings by ID' })
    @ApiParam({ name: 'id', description: 'UserSettings id', required: true })
    // @ApiOkResponse({
    //   type: UserSettingsDto,
    //   description: 'Special obj in type: ResultObjectDTO',
    // })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'UserSettings not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.userSettingsService.getById(params.id, CommonTools.populateObject([ 'values','idtypegender', 'idlanguage']));
      // const obj = await this.userSettingsService.getUserSettingsByIdUser(params.id);
      
  
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  

    @ApiOperation({ summary: 'Get UserSettings by user ID' })
    @ApiParam({ name: 'id', description: 'UserSettings id', required: true })
    // @ApiOkResponse({
    //   type: UserSettingsDto,
    //   description: 'Special obj in type: ResultObjectDTO',
    // })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'UserSettings not found',
    })
    @Get('/user/:id')
    public async getByUserId(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      // const obj = await this.userSettingsService.getById(params.id, CommonTools.populateObject(['idsphone', 'idtypephone', 'values','idtypegender', 'idlanguage']));
      const obj = await this.userSettingsService.getByField('iduser', params.id, [  'values','idtypegender', 'idlanguage']);
      // const obj = await this.userSettingsService.getUserSettingsByIdUser(params.id);
      
  
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
        // return await ToolsGenerateResponse.getOkObject(res, obj);
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete UserSettings by ID' })
    @ApiParam({ name: 'id', description: 'UserSettings id', required: true })
    @ApiOkResponse({
      type: ResultObjectDTO,
      description: 'Delete success',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'UserSettings not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.userSettingsService.delete(params.id);
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
  
    @ApiOperation({ summary: 'Update UserSettings by ID' })
    @ApiParam({ name: 'id', description: 'UserSettings id', required: true })
    // @ApiBody({ type: PostUserSettingsDto })
    @ApiConsumes('application/json')
    // @ApiOkResponse({
    //   type: UserSettingsDto,
    //   description: 'Special obj in type: ResultObjectDTO',
    // })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'UserSettings not found',
    })
    @Put('/:id')
    // @UseInterceptors(new PrepareObjectBody(PostUserSettingsDto))
    public async update(
      @Res() res,
      @Param() params,
      @Body() body,
    ): Promise<ResultObjectDTO> {
      const obj = await this.userSettingsService.save(body,params.id);
      
  
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
  