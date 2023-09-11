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
import { PageDto } from '../dto/page.dto';
import { PageService } from '../services/page.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostPageDto } from '../dto/postpage.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import {CommonTools} from 'src/app/tools/commontools';
import { ResultPageDto } from '../dto/resultpage.dto';
import { PageValueService } from '../services/pagevalue.service';

@ApiTags('admin/page')
@Controller('admin/page')
@UseGuards(GeneralAdminGuard)
export class AdminPageController {
    constructor(
        private pageService: PageService,
        private pageValueService: PageValueService
    ) { }

    @ApiOperation({ summary: 'Add Page' })
    @ApiBody({ type: PostPageDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultPageDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostPageDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
          const obj = await this.pageService.save(body);
        // const obj = await this.pageService.addTypeWithValue(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.BAD_REQUEST,
                MessageTypes.OBJECT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get Page list' })
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
        req.requestList.populate.addToPopulates(['values', 'media']);
          const obj = await this.pageService.getAll(req.requestList);
        // const obj = await this.pageValueService.getAllPopulate(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.pageService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
        );
    }

    @ApiOperation({ summary: 'Get Page by ID' })
    @ApiParam({ name: 'id', description: 'Page id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: PageDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Page not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params,@Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {
        let obj = null;  
        if (idlanguage == undefined) obj = await this.pageService.getById(params.id,CommonTools.populateObject(['values', 'idlanguage', 'media']));
        else obj = await this.pageService.getById(params.id,CommonTools.populateObject(['values', 'idlanguage', 'media']),idlanguage);
        // const obj = await this.pageValueService.findByIdAndPopulate(params.id);


        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete Page by ID' })
    @ApiParam({ name: 'id', description: 'Page id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Page not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.pageService.delete(params.id);
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

    @ApiOperation({ summary: 'Update Page by ID' })
    @ApiParam({ name: 'id', description: 'Page id', required: true })
    @ApiBody({ type: ResultPageDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultPageDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Page not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(ResultPageDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
          const obj = await this.pageService.save(body,params.id);
        
        // const obj = await this.pageService.updateTypeWithLabel(params.id, body);

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
