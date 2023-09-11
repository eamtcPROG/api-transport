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
import { BlogCategoryDto } from '../dto/blogcategory.dto';
import { BlogCategoryService } from '../services/blogcategory.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostBlogCategoryDto } from '../dto/postblogcategory.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { CommonTools } from 'src/app/tools/commontools';
import { ResultBlogCategoryDto } from '../dto/resultblogcategory.dto';
import { BlogCategoryValueService } from '../services/blogcategoryvalue.service';

@ApiTags('admin/blogcategory')
@Controller('admin/blogcategory')
@UseGuards(GeneralAdminGuard)
export class AdminBlogCategoryController {
    constructor(
        private blogCategoryService: BlogCategoryService,
        private blogCategoryValueService: BlogCategoryValueService
    ) { }

    @ApiOperation({ summary: 'Add Blog Category' })
    @ApiBody({ type: PostBlogCategoryDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultBlogCategoryDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostBlogCategoryDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
        const obj = await this.blogCategoryService.save(body);
        //   const obj = await this.blogCategoryService.addTypeWithValue(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.BAD_REQUEST,
                MessageTypes.OBJECT_PARENT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get Blog Category list' })
    @ApiOkResponse({
        type: ResultListDTO,
        description: 'Result List in type: ResultListDTO',
    })
    @ApiQuery({
        name: 'page',
        type: 'integer',
        description: 'BlogCategory number, default: 1',
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
        req.requestList.populate.addToPopulates(['values', 'allvalues','idlanguage']);
          const obj = await this.blogCategoryService.getAll(req.requestList);
        // const obj = await this.blogCategoryValueService.getAllPopulate(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.blogCategoryService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
        );
    }

    @ApiOperation({ summary: 'Get Blog Category by ID' })
    @ApiParam({ name: 'id', description: 'Blog Category id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: BlogCategoryDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'BlogCategory not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params, @Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {
        let obj = null;
       
        if(idlanguage == undefined) obj = await this.blogCategoryService.getById(params.id,CommonTools.populateObject(['values', 'allvalues', 'idlanguage','idtypeblogcategory']));
        else obj = await this.blogCategoryService.getById(params.id,CommonTools.populateObject(['values', 'allvalues', 'idlanguage','idtypeblogcategory']),idlanguage);
        //   const obj = await this.blogCategoryService.getById(params.id,CommonTools.populateObject());
        // const obj = await this.blogCategoryValueService.findByIdAndPopulate(params.id);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete BlogCategory by ID' })
    @ApiParam({ name: 'id', description: 'BlogCategory id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'BlogCategory not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.blogCategoryService.delete(params.id);
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

    @ApiOperation({ summary: 'Update BlogCategory by ID' })
    @ApiParam({ name: 'id', description: 'BlogCategory id', required: true })
    @ApiBody({ type: ResultBlogCategoryDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultBlogCategoryDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'BlogCategory not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(ResultBlogCategoryDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
        const obj = await this.blogCategoryService.save(body, params.id);

        //   const obj = await this.blogCategoryService.updateTypeWithLabel(
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
