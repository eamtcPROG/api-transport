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
// import { PermissionDto } from '../dto/permission.dto';
import { PermissionService } from '../services/permission.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
// import { PostPermissionDto } from '../dto/postpermission.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
// import { PutPermissionDto } from '../dto/putpermission.dto';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';

@ApiTags('permission')
@Controller('permission')
@UseGuards(GeneralAdminGuard)
export class PermissionController {
    constructor(private permissionService: PermissionService) { }

    @ApiOperation({ summary: 'Add Permission' })
    // @ApiBody({ type: PostPermissionDto })
    @ApiConsumes('application/json')
    // @ApiOkResponse({
    //     type: PermissionDto,
    //     description: 'Special obj in type: ResultObjectDTO',
    // })
    @Post('/')
    // @UseInterceptors(new PrepareObjectBody(PostPermissionDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
        const obj = await this.permissionService.save(body);
        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.BAD_REQUEST,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get Permission list' })
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
        // const obj = await this.permissionService.getAllWithRoles(req.requestList);
        const obj = await this.permissionService.getAll(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.permissionService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            // obj.permission,
            obj,
            req.requestList,
            totalObjects,
            // obj.roles,
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
    
        const obj = await this.permissionService.getHash();
        
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

    @ApiOperation({ summary: 'Get Permission by ID' })
    @ApiParam({ name: 'id', description: 'Permission id', required: true })
    // @ApiOkResponse({
    //     type: PermissionDto,
    //     description: 'Special obj in type: ResultObjectDTO',
    // })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Permission not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        // const obj = await this.permissionService.getByIdWithRoles(params.id);
        const obj = await this.permissionService.getById(params.id);
        
        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    
    

    @ApiOperation({ summary: 'Delete Permission by ID' })
    @ApiParam({ name: 'id', description: 'Permission id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Permission not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.permissionService.delete(params.id);
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

    
    @ApiOperation({ summary: 'Update Permission by ID' })
    @ApiParam({ name: 'id', description: 'Permission id', required: true })
    // @ApiBody({ type: PutPermissionDto })
    @ApiConsumes('application/json')
    // @ApiOkResponse({
    //     type: PermissionDto,
    //     description: 'Special obj in type: ResultObjectDTO',
    // })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Permission not found',
    })
    @Put('/:id')
    // @UseInterceptors(new PrepareObjectBody(PutPermissionDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
const obj = await this.permissionService.save(body,params.id);
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
