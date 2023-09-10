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
  // import { SocialDto } from '../dto/social.dto';
  import { SocialService } from '../services/social.service';
  import ResultListDTO from 'src/app/dto/resultlist.dto';
  import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
  // import { PostSocialDto } from '../dto/postsocial.dto';
  import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
  
  import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
  
  @ApiTags('social')
  @Controller('social')
  @UseGuards(GeneralAdminGuard)
  export class SocialController {
    constructor(private socialService: SocialService) {}
  
    @ApiOperation({ summary: 'Add Social' })
    // @ApiBody({ type: PostSocialDto })
    @ApiConsumes('application/json')
    // @ApiOkResponse({
    //   type: SocialDto,
    //   description: 'Special obj in type: ResultObjectDTO',
    // })
    @Post('/')
    // @UseInterceptors(new PrepareObjectBody(PostSocialDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
      const obj = await this.socialService.save(body);
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.BAD_REQUEST,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  

    @ApiOperation({ summary: 'Add array Social' })
    // @ApiBody({ type: Array<SocialDto> })
    @ApiConsumes('application/json')
    // @ApiOkResponse({
    //   type: SocialDto,
    //   description: 'Special obj in type: ResultObjectDTO',
    // })
    @Post('/array')
    // @UseInterceptors(new PrepareObjectBody(Array<SocialDto>))
    public async addArray(@Body() body, @Res() res): Promise<ResultObjectDTO> {
      const obj = await this.socialService.parseArrayForSave(body);

      if (!obj.added) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.BAD_REQUEST,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get Social list' })
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
      const obj = await this.socialService.getAll(req.requestList);
      
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
      const totalObjects = await this.socialService.getCount(
        req.requestList,
      );
      return await ToolsGenerateResponse.getOkList(
        res,
        obj,
        req.requestList,
        totalObjects,
      );
    }
  
    @ApiOperation({ summary: 'Get Social by ID' })
    @ApiParam({ name: 'id', description: 'Social id', required: true })
    // @ApiOkResponse({
    //   type: SocialDto,
    //   description: 'Special obj in type: ResultObjectDTO',
    // })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'Social not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.socialService.getById(params.id);
  
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
    @Get('/user/:id')
    public async getByUserId(@Res() res, @Param() params): Promise<ResultObjectDTO> {
  
      const obj = await this.socialService.getByFieldList('iduser', params.id, 50, ['values', 'idtypesocial']);
      
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
    @ApiOperation({ summary: 'Delete Social by ID' })
    @ApiParam({ name: 'id', description: 'Social id', required: true })
    @ApiOkResponse({
      type: ResultObjectDTO,
      description: 'Delete success',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'Social not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.socialService.delete(params.id);
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
  
    @ApiOperation({ summary: 'Update Social by ID' })
    @ApiParam({ name: 'id', description: 'Social id', required: true })
    // @ApiBody({ type: PostSocialDto })
    @ApiConsumes('application/json')
    // @ApiOkResponse({
    //   type: SocialDto,
    //   description: 'Special obj in type: ResultObjectDTO',
    // })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'Social not found',
    })
    @Put('/:id')
    // @UseInterceptors(new PrepareObjectBody(PostSocialDto))
    public async update(
      @Res() res,
      @Param() params,
      @Body() body,
    ): Promise<ResultObjectDTO> {
      const obj = await this.socialService.save(body,params.id);
  
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
  