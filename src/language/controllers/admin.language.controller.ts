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
  import { LanguageDto } from '../dto/language.dto';
  import { LanguageService } from '../services/language.service';
  import ResultListDTO from 'src/app/dto/resultlist.dto';
  import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
  import { PostLanguageDto } from '../dto/postlanguage.dto';
  import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
  import { PutLanguageDto } from '../dto/putlanguage.dto';
  import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
  
  @ApiTags('admin/language')
  @Controller('admin/language')
  @UseGuards(GeneralAdminGuard)
  export class AdminLanguageController {
    constructor(private languageService: LanguageService) {}
  
    @ApiOperation({ summary: 'Add Language' })
    @ApiBody({ type: PostLanguageDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: LanguageDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostLanguageDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
      const obj = await this.languageService.save(body);
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.BAD_REQUEST,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Get Language list' })
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
      const obj = await this.languageService.getAll(req.requestList);
      
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
      const totalObjects = await this.languageService.getCount(
        req.requestList,
      );
      return await ToolsGenerateResponse.getOkList(
        res,
        obj,
        req.requestList,
        totalObjects,
      );
    }

    @ApiOperation({ summary: 'Get hash' })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Result obj in type: ResultObjectDTO',
  })
  @Get('/hash')
  public async getHash(
    @Res() res,
  ): Promise<ResultObjectDTO> {
    const obj = await this.languageService.getHash();

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(
      res,
      obj,
    );
  }
  
    @ApiOperation({ summary: 'Get Language by ID' })
    @ApiParam({ name: 'id', description: 'Language id', required: true })
    @ApiOkResponse({
      type: LanguageDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'Language not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.languageService.getById(params.id);
  
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Delete Language by ID' })
    @ApiParam({ name: 'id', description: 'Language id', required: true })
    @ApiOkResponse({
      type: ResultObjectDTO,
      description: 'Delete success',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'Language not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.languageService.delete(params.id);
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
  
    @ApiOperation({ summary: 'Update Language by ID' })
    @ApiParam({ name: 'id', description: 'Language id', required: true })
    @ApiBody({ type: PutLanguageDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: LanguageDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'Language not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(PutLanguageDto))
    public async update(
      @Res() res,
      @Param() params,
      @Body() body,
    ): Promise<ResultObjectDTO> {
      const obj = await this.languageService.save(body, params.id);
  
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
  