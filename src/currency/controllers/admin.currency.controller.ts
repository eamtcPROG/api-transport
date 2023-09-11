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
import { CurrencyDto } from '../dto/currency.dto';
import { CurrencyService } from '../services/currency.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostCurrencyDto } from '../dto/postcurrency.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import {CommonTools} from 'src/app/tools/commontools';
import { ResultCurrencyDto } from '../dto/resultcurrency.dto';
import { CurrencyValueService } from '../services/currencyvalue.service';

@ApiTags('admin/currency')
@Controller('admin/currency')
@UseGuards(GeneralAdminGuard)
export class AdminCurrencyController {
    constructor(
        private currencyService: CurrencyService,
        private currencyValueService: CurrencyValueService
    ) { }

    @ApiOperation({ summary: 'Add Curreny ' })
    @ApiBody({ type: PostCurrencyDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultCurrencyDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostCurrencyDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
          const obj = await this.currencyService.save(body);
        // const obj = await this.currencyService.addTypeWithValue(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.BAD_REQUEST,
                MessageTypes.OBJECT_PARENT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get Curreny  list' })
    @ApiOkResponse({
        type: ResultListDTO,
        description: 'Result List in type: ResultListDTO',
    })
    @ApiQuery({
        name: 'page',
        type: 'integer',
        description: 'Currency number, default: 1',
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
        req.requestList.populate.addToPopulates(['values', 'allvalues']);
          const obj = await this.currencyService.getAll(req.requestList);
        // const obj = await this.currencyValueService.getAllPopulate(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.currencyService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
        );
    }

    @ApiOperation({ summary: 'Get Curreny  by ID' })
    @ApiParam({ name: 'id', description: 'Curreny  id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: CurrencyDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Currency not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params,@Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {
        let obj = null; 
        if (idlanguage == undefined) obj = await this.currencyService.getById(params.id,CommonTools.populateObject());
        else obj = await this.currencyService.getById(params.id,CommonTools.populateObject(),idlanguage);
          // const obj = await this.currencyValueService.findByIdAndPopulate(params.id);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete Currency by ID' })
    @ApiParam({ name: 'id', description: 'Currency id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Currency not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.currencyService.delete(params.id);
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

    @ApiOperation({ summary: 'Update Currency by ID' })
    @ApiParam({ name: 'id', description: 'Currency id', required: true })
    @ApiBody({ type: ResultCurrencyDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultCurrencyDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Currency not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(ResultCurrencyDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
        const obj = await this.currencyService.save(body, params.id);

    //   const obj = await this.currencyService.updateTypeWithLabel(
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
