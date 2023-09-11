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
import { MenuDto } from '../dto/menu.dto';
import { MenuService } from '../services/menu.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostMenuDto } from '../dto/postmenu.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { CommonTools } from 'src/app/tools/commontools';
import { ResultMenuDto } from '../dto/resultmenu.dto';
import { MenuValueService } from '../services/menuvalue.service';

@ApiTags('admin/menu')
@Controller('admin/menu')
@UseGuards(GeneralAdminGuard)
export class AdminMenuController {
    constructor(
        private menuService: MenuService,
        private menuValueService: MenuValueService
    ) { }

    @ApiOperation({ summary: 'Add Menu' })
    @ApiBody({ type: PostMenuDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultMenuDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostMenuDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
        const obj = await this.menuService.save(body);
        // const obj = await this.menuService.addTypeWithValue(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.BAD_REQUEST,
                MessageTypes.OBJECT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get Menu list' })
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
        req.requestList.populate.addToPopulates(['values', 'idattachment']);
        const obj = await this.menuService.getAll(req.requestList);
        // const obj = await this.menuValueService.getAllPopulate(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.menuService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
        );
    }

    @ApiOperation({ summary: 'Get Menu by ID' })
    @ApiParam({ name: 'id', description: 'Menu id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: MenuDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Menu not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params, @Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {
        let obj = null;
        if (idlanguage == undefined) obj = await this.menuService.getById(params.id, CommonTools.populateObject(['values', 'allvalues', 'idlanguage','idpage']));
        else obj = await this.menuService.getById(params.id, CommonTools.populateObject(['values', 'allvalues', 'idlanguage','idpage']), idlanguage);
        // const obj = await this.menuValueService.findByIdAndPopulate(params.id);


        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete Menu by ID' })
    @ApiParam({ name: 'id', description: 'Menu id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Menu not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.menuService.delete(params.id);
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

    @ApiOperation({ summary: 'Update Menu by ID' })
    @ApiParam({ name: 'id', description: 'Menu id', required: true })
    @ApiBody({ type: ResultMenuDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultMenuDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Menu not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(ResultMenuDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
        const obj = await this.menuService.save(body, params.id);

        // const obj = await this.menuService.updateTypeWithLabel(params.id, body);

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
