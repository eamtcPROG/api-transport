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
import { UserRoleDto } from 'src/user/dto/userrole.dto';
import { UserRoleService } from '../services/userrole.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostUserRoleDto } from 'src/user/dto/postuserrole.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { PutUserRoleDto } from 'src/user/dto/putuserrole.dto';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { UserRolePopulateDto } from 'src/user/dto/userrolepopulate.dto';

@ApiTags('userrole')
@Controller('userrole')
@UseGuards(GeneralAdminGuard)
export class UserRoleController {
  constructor(private userRoleService: UserRoleService) { }

  @ApiOperation({ summary: 'Add UserRole' })
  @ApiBody({ type: PostUserRoleDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: UserRoleDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @Post('/')
  @UseInterceptors(new PrepareObjectBody(PostUserRoleDto))
  public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
    const obj = await this.userRoleService.save(body);
    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.BAD_REQUEST,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get UserRole list' })
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
    req.requestList.populate.addToPopulates(['roleobj']);
    const obj = await this.userRoleService.getAll(req.requestList);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.userRoleService.getCount(
      req.requestList,
    );
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get UserRole by ID' })
  @ApiParam({ name: 'id', description: 'UserRole id', required: true })
  @ApiOkResponse({
    type: UserRoleDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'UserRole not found',
  })
  @Get('/:id')
  public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.userRoleService.getById(params.id);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }


  @ApiOperation({ summary: 'Get UserRole populate by ID' })
  @ApiParam({ name: 'id', description: 'user id', required: true })
  @ApiOkResponse({
    type: UserRolePopulateDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'UserRole not found',
  })
  @Get('/user/:id')
  public async getUserRolesById(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.userRoleService.getByFieldList('iduser', params.id, 50, ['roleobj']);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Delete UserRole by ID' })
  @ApiParam({ name: 'id', description: 'UserRole id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'UserRole not found',
  })
  @Delete('/:id')
  public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.userRoleService.delete(params.id);
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

  @ApiOperation({ summary: 'Update UserRole by ID' })
  @ApiParam({ name: 'id', description: 'UserRole id', required: true })
  @ApiBody({ type: PutUserRoleDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: UserRoleDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'UserRole not found',
  })
  @Put('/:id')
  @UseInterceptors(new PrepareObjectBody(PutUserRoleDto))
  public async update(
    @Res() res,
    @Param() params,
    @Body() body,
  ): Promise<ResultObjectDTO> {
    const obj = await this.userRoleService.save(body, params.id);

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
