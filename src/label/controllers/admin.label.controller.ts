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
import { LabelDto } from '../dto/label.dto';
import { LabelService } from '../services/label.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostLabelDto } from '../dto/postlabel.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { PutLabelDto } from '../dto/putlabel.dto';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { LabelValueService } from '../services/labelvalue.service';
import { ResultLabelDto } from '../dto/resultlabel.dto';
import { LabelValuePopulateDto } from '../dto/labelvaluepopulate.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { CommonTools } from 'src/app/tools/commontools';

@ApiTags('admin/label')
@Controller('admin/label')
@UseGuards(GeneralAdminGuard)
export class AdminLabelController {
  constructor(private labelService: LabelService,
    private labelValueService: LabelValueService,
  ) { }

  @ApiOperation({ summary: 'Add Label' })
  @ApiBody({ type: PostLabelDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: ResultLabelDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @Post('/')
  @UseInterceptors(new PrepareObjectBody(PostLabelDto))
  public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
    const obj = await this.labelService.save(body);
    // const obj = await this.labelService.addLabelWithValue(body);
    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.BAD_REQUEST,
        MessageTypes.OBJECT_ALREADY_IN_DATABASE,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get Label list' })
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
    req.requestList.populate.addToPopulates(['values', 'allvalues']);
    const obj = await this.labelService.getAll(req.requestList);


    // const obj = await this.labelValueService.getAllPopulate(req.requestList);
    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.labelService.getCount(
      req.requestList,
    );
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get Label list by id language' })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Result List in type: ResultObjectDTO',
  })
  @ApiParam({ name: 'id', description: 'Language id', required: true })
  @ApiParam({ name: 'type', description: 'Label type', required: true })
  @Get('/with-language/:id/:type')
  public async getListByLanguage(
    @Res() res,
    @Param() params,
    @Req() req,
  ): Promise<ResultObjectDTO> {
    const obj = await this.labelValueService.getByField('idlanguage', params.id);

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


  @ApiOperation({ summary: 'Get hash' })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Result obj in type: ResultObjectDTO',
  })
  @Get('/hash')
  public async getHash(
    @Res() res,
  ): Promise<ResultObjectDTO> {
    const obj = await this.labelValueService.getHash();

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

  @ApiOperation({ summary: 'Get Label by ID' })
  @ApiParam({ name: 'id', description: 'Label id', required: true })
  @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
  @ApiOkResponse({
    type: LabelDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Label not found',
  })
  @Get('/:id')
  public async get(@Res() res, @Param() params, @Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {
    // req.requestList.populate.addToPopulates(['values', 'allvalues']);
    //   const requestPopulateDTO: RequestPopulateDTO = new RequestPopulateDTO();
    // requestPopulateDTO.populates = ['values', 'allvalues'];
    let obj = null;
    // console.log('idlanguage', idlanguage);
    if (idlanguage == undefined) obj = await this.labelService.getById(params.id, CommonTools.populateObject());
    else obj = await this.labelService.getById(params.id, CommonTools.populateObject(), idlanguage);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get Label Populate by ID' })
  @ApiParam({ name: 'id', description: 'LabelValue id', required: true })
  @ApiOkResponse({
    type: LabelValuePopulateDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Label not found',
  })
  @Get('/populate/:id')
  public async getPopulate(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    // const obj = await this.labelValueService.getByIdAndPopulate(params.id);

    const obj = await this.labelValueService.getById(params.id);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    return await ToolsGenerateResponse.getOkObject(res, obj);
  }




  @ApiOperation({ summary: 'Delete Label by ID' })
  @ApiParam({ name: 'id', description: 'Label id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Label not found',
  })
  @Delete('/:id')
  public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.labelService.delete(params.id);
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

  @ApiOperation({ summary: 'Update Label by ID' })
  @ApiParam({ name: 'id', description: 'Label id', required: true })
  @ApiParam({ name: 'idvalue', description: 'Label Value id', required: true })
  @ApiBody({ type: PostLabelDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: ResultLabelDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Label not found',
  })
  @Put('/:id/:idvalue')
  @UseInterceptors(new PrepareObjectBody(PostLabelDto))
  public async update(
    @Res() res,
    @Param() params,
    @Body() body,
  ): Promise<ResultObjectDTO> {
    const obj = await this.labelService.save(body, params.id);
    // const obj = await this.labelService.updateLabelWithValue(
    //   params.idvalue,
    //   params.id,
    //   body,
    // );

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }


  @ApiOperation({ summary: 'Update Label and LabelValue by ID Label' })
  @ApiParam({ name: 'id', description: 'Label id', required: true })
  @ApiBody({ type: PostLabelDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: ResultLabelDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Label not found',
  })
  @Put('/:id')
  @UseInterceptors(new PrepareObjectBody(PostLabelDto))
  public async updateOnFront(
    @Res() res,
    @Param() params,
    @Body() body,
  ): Promise<ResultObjectDTO> {
    const obj = await this.labelService.save(body, params.id);
    // const obj = await this.labelService.updateOnFront(params.id, body);

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


