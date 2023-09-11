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
import { RoleDto } from 'src/user/dto/role.dto';
import { RoleService } from '../services/role.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostRoleDto } from 'src/user/dto/postrole.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { PutRoleDto } from 'src/user/dto/putrole.dto';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';

@ApiTags('role')
@Controller('role')
@UseGuards(GeneralAdminGuard)
export class RoleController {
  constructor(private roleService: RoleService) { }

  @ApiOperation({ summary: 'Add Role' })
  @ApiBody({ type: PostRoleDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: RoleDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @Post('/')
  @UseInterceptors(new PrepareObjectBody(PostRoleDto))
  public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
    const obj = await this.roleService.save(body);
    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.BAD_REQUEST,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Get Role list' })
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
    const obj = await this.roleService.getAll(req.requestList);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.roleService.getCount(
      req.requestList,
    );
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get Role by ID' })
  @ApiParam({ name: 'id', description: 'Role id', required: true })
  @ApiOkResponse({
    type: RoleDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Role not found',
  })
  @Get('/:id')
  public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.roleService.getById(params.id);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Delete Role by ID' })
  @ApiParam({ name: 'id', description: 'Role id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Role not found',
  })
  @Delete('/:id')
  public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.roleService.delete(params.id);
    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.BAD_REQUEST,
        MessageTypes.ROLE_FIXED,
      );
    }
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

  @ApiOperation({ summary: 'Update Role by ID' })
  @ApiParam({ name: 'id', description: 'Role id', required: true })
  @ApiBody({ type: PutRoleDto })
  @ApiConsumes('application/json')
  @ApiOkResponse({
    type: RoleDto,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'Role not found',
  })
  @Put('/:id')
  @UseInterceptors(new PrepareObjectBody(PutRoleDto))
  public async update(
    @Res() res,
    @Param() params,
    @Body() body,
  ): Promise<ResultObjectDTO> {
    const obj = await this.roleService.save(body,params.id);
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
