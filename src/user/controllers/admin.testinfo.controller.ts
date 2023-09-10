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
// import { TestInfoDto } from '../dto/testinfo.dto';
import { TestInfoService } from '../services/testinfo.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
// import { PostTestInfoDto } from '../dto/posttestinfo.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
// import { PutTestInfoDto } from '../dto/puttestinfo.dto';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';

@ApiTags('admin/testinfo')
@Controller('admin/testinfo')
@UseGuards(GeneralAdminGuard)
export class AdminTestInfoController {
  constructor(private testInfoService: TestInfoService) { }

  @ApiOperation({ summary: 'Add TestInfo' })
  // @ApiBody({ type: PostTestInfoDto })
  @ApiConsumes('application/json')
  // @ApiOkResponse({
  //   type: TestInfoDto,
  //   description: 'Special obj in type: ResultObjectDTO',
  // })
  @Post('/')
  // @UseInterceptors(new PrepareObjectBody(PostTestInfoDto))
  public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
    const obj = await this.testInfoService.save(body);
    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.BAD_REQUEST,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get TestInfo list' })
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
    const obj = await this.testInfoService.getAll(req.requestList);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.testInfoService.getCount(
      req.requestList,
    );
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get TestInfo by ID' })
  @ApiParam({ name: 'id', description: 'TestInfo id', required: true })
  // @ApiOkResponse({
  //   type: TestInfoDto,
  //   description: 'Special obj in type: ResultObjectDTO',
  // })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'TestInfo not found',
  })
  @Get('/:id')
  public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.testInfoService.getById(params.id);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Delete TestInfo by ID' })
  @ApiParam({ name: 'id', description: 'TestInfo id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'TestInfo not found',
  })
  @Delete('/:id')
  public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.testInfoService.delete(params.id);
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

  @ApiOperation({ summary: 'Update TestInfo by ID' })
  @ApiParam({ name: 'id', description: 'TestInfo id', required: true })
  // @ApiBody({ type: PutTestInfoDto })
  @ApiConsumes('application/json')
  // @ApiOkResponse({
  //   type: TestInfoDto,
  //   description: 'Special obj in type: ResultObjectDTO',
  // })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'TestInfo not found',
  })
  @Put('/:id')
  // @UseInterceptors(new PrepareObjectBody(PutTestInfoDto))
  public async update(
    @Res() res,
    @Param() params,
    @Body() body,
  ): Promise<ResultObjectDTO> {
    const obj = await this.testInfoService.save(body, params.id);

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
