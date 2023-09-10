import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  Patch,
  UseInterceptors,
  Body,
  Req,
  UseGuards,
  Post,
  Delete,
  Put
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import ResultObjectDTO from 'src/app/dto/resultobject.dto';
// import { UserDto } from '../dto/user.dto';
import { ToolsGenerateResponse } from 'src/app/tools/toolsgenerateresponse';
import { MessageTypes } from 'src/app/tools/messagetypes';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
// import { ModifyPasswordAdminDto } from 'src/user/dto/modifypasswordadmin.dto'
import { UserService } from '../services/user.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
// import { CreateUserAdminDto } from '../dto/createuseradmin.dto';
// import { UpdateUserAdminDto } from '../dto/updateuseradmin.dto';
import RequestPopulateDTO from 'src/app/dto/requestpopulate.dto';
import { CommonTools } from 'src/app/tools/commontools';

@ApiTags('admin/user')
@Controller('admin/user')
@UseGuards(GeneralAdminGuard)
export class AdminUserController {
  constructor(private userService: UserService) { }

  @ApiOperation({ summary: 'Get User list' })
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

    req.requestList.populate.addToPopulates(['userroles', 'roleobj']);

    const obj = await this.userService.getAll(req.requestList);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.OBJECT_NOT_FOUND,
      );
    }
    const totalObjects = await this.userService.getCount(req.requestList);
    return await ToolsGenerateResponse.getOkList(
      res,
      obj,
      req.requestList,
      totalObjects,
    );
  }

  @ApiOperation({ summary: 'Get User by ID' })
  @ApiParam({ name: 'id', description: 'User id', required: true })
  // @ApiOkResponse({
  //   type: UserDto,
  //   description: 'Special obj in type: ResultObjectDTO',
  // })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'User not found',
  })
  @Get('/:id')
  public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    // find in service

    // EXEMPLE
    // let obj = new UserDto();
    // obj.id = params.id;
    // obj.status = 1;

    // if (obj.id == '-1') {
    //   obj = null;
    // }

    const obj = await this.userService.getById(params.id, CommonTools.populateObject(['userroles', 'roleobj', 'usersettings', 'phones', 'idtypephone', 'values', 'usersocial']));
    // ---------------------

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.USER_NOT_FOUND,
      );
    }

    return await ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Modify password by admin' })
  @ApiConsumes('application/json')
  // @ApiBody({ type: ModifyPasswordAdminDto })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'User not found',
  })
  @ApiParam({ name: 'id', description: 'User id', required: true })
  @Patch('/password/:id')
  // @UseInterceptors(new PrepareObjectBody(ModifyPasswordAdminDto))
  public async modifyPassword(
    @Res() res,
    @Body() body,
    @Param() params,
  ): Promise<ResultObjectDTO> {
    const obj = await this.userService.updatePassword(params.id, body);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.USER_NOT_FOUND,
      );
    }

    return ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Add user by admin' })
  @ApiConsumes('application/json')
  // @ApiBody({ type: CreateUserAdminDto })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Special obj in type: ResultObjectDTO',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'User not found',
  })
  @Post('/')
  // @UseInterceptors(new PrepareObjectBody(CreateUserAdminDto))
  public async add(
    @Res() res,
    @Body() body,

  ): Promise<ResultObjectDTO> {
    const obj = await this.userService.createUserByAdmin(body);

    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.NOT_FOUND,
        MessageTypes.USER_NOT_FOUND,
      );
    }

    return ToolsGenerateResponse.getOkObject(res, obj);
  }

  @ApiOperation({ summary: 'Delete User by ID by Admin' })
  @ApiParam({ name: 'id', description: 'User id', required: true })
  @ApiOkResponse({
    type: ResultObjectDTO,
    description: 'Delete success',
  })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'User not found',
  })
  @Delete('/:id')
  public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
    const obj = await this.userService.delete(params.id);
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


  @ApiOperation({ summary: 'Update user by admin by ID' })
  @ApiParam({ name: 'id', description: 'User id', required: true })
  // @ApiBody({ type: UserDto })
  @ApiConsumes('application/json')
  // @ApiOkResponse({
  //   type: UserDto,
  //   description: 'Special obj in type: ResultObjectDTO',
  // })
  @ApiNotFoundResponse({
    type: ResultObjectDTO,
    description: 'User not found',
  })
  @Put('/:id')
  // @UseInterceptors(new PrepareObjectBody(UserDto))
  public async update(
    @Res() res,
    @Param() params,
    @Body() body,
  ): Promise<ResultObjectDTO> {
    const obj = await this.userService.save(body,params.id);

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
