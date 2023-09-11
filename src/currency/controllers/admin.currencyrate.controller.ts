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
  import { CurrencyRateDto } from '../dto/currencyrate.dto';
  import { CurrencyRateService } from '../services/currencyrate.service';
  import ResultListDTO from 'src/app/dto/resultlist.dto';
  import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
  import { PostCurrencyRateDto } from '../dto/postcurrencyrate.dto';
  import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
  import {CommonTools} from 'src/app/tools/commontools';
  import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { CurrencyRatePopulateDto } from '../dto/currencyratepopulate.dto';
  
  @ApiTags('admin/currencyrate')
  @Controller('admin/currencyrate')
  @UseGuards(GeneralAdminGuard)
  export class AdminCurrencyRateController {
    constructor(private currencyRateService: CurrencyRateService) {}
  
    @ApiOperation({ summary: 'Add CurrencyRate' })
    @ApiBody({ type: PostCurrencyRateDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: CurrencyRateDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostCurrencyRateDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
      const obj = await this.currencyRateService.save(body);
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.BAD_REQUEST,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Get CurrencyRate list' })
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
      // ['fromidcurrency', 'toidcurrency']
      req.requestList.populate.addToPopulates(['fromidcurrency', 'toidcurrency']);
      const obj = await this.currencyRateService.getAll(req.requestList);
      // const obj = await this.currencyRateService.getAllPopulate(req.requestList);
      
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
      const totalObjects = await this.currencyRateService.getCount(
        req.requestList,
      );
      return await ToolsGenerateResponse.getOkList(
        res,
        obj,
        req.requestList,
        totalObjects,
      );
    }
  
    @ApiOperation({ summary: 'Get CurrencyRate by ID' })
    @ApiParam({ name: 'id', description: 'CurrencyRate id', required: true })
    @ApiOkResponse({
      type: CurrencyRatePopulateDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'CurrencyRate not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.currencyRateService.getById(params.id,CommonTools.populateObject(['fromidcurrency', 'toidcurrency']));
      // ['fromidcurrency', 'toidcurrency']
      // const obj = await this.currencyRateService.findByIdAndPopulate(params.id);
      
      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.NOT_FOUND,
          MessageTypes.OBJECT_NOT_FOUND,
        );
      }
  
      return await ToolsGenerateResponse.getOkObject(res, obj);
    }
  
    @ApiOperation({ summary: 'Delete CurrencyRate by ID' })
    @ApiParam({ name: 'id', description: 'CurrencyRate id', required: true })
    @ApiOkResponse({
      type: ResultObjectDTO,
      description: 'Delete success',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'CurrencyRate not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
      const obj = await this.currencyRateService.delete(params.id);
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
  
    @ApiOperation({ summary: 'Update CurrencyRate by ID' })
    @ApiParam({ name: 'id', description: 'CurrencyRate id', required: true })
    @ApiBody({ type: PostCurrencyRateDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
      type: CurrencyRateDto,
      description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
      type: ResultObjectDTO,
      description: 'CurrencyRate not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(PostCurrencyRateDto))
    public async update(
      @Res() res,
      @Param() params,
      @Body() body,
    ): Promise<ResultObjectDTO> {
      const obj = await this.currencyRateService.save(body, params.id);
  
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
  