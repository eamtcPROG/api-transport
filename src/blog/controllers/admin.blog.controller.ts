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
import { BlogDto } from '../dto/blog.dto';
import { BlogService } from '../services/blog.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostBlogDto } from '../dto/postblog.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import {CommonTools} from 'src/app/tools/commontools';
import { ResultBlogDto } from '../dto/resultblog.dto';
import { BlogValueService } from '../services/blogvalue.service';

@ApiTags('admin/blog')
@Controller('admin/blog')
@UseGuards(GeneralAdminGuard)
export class AdminBlogController {
    constructor(
        private blogService: BlogService,
        private blogValueService: BlogValueService
    ) { }

    @ApiOperation({ summary: 'Add Blog' })
    @ApiBody({ type: PostBlogDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultBlogDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostBlogDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
        const obj = await this.blogService.save(body);
    //   const obj = await this.blogService.addTypeWithValue(body);

      if (obj == null) {
        return await ToolsGenerateResponse.getErrObject(
          res,
          HttpStatus.BAD_REQUEST,
          MessageTypes.OBJECT_FOUND,
        );
      }

      return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get Blog list' })
    @ApiOkResponse({
        type: ResultListDTO,
        description: 'Result List in type: ResultListDTO',
    })
    @ApiQuery({
        name: 'page',
        type: 'integer',
        description: 'Blog number, default: 1',
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
        req.requestList.populate.addToPopulates(['values', 'idblogcategory','media']);
          const obj = await this.blogService.getAll(req.requestList);
        // const obj = await this.blogValueService.getAllPopulate(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.blogService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
        );
    }

    @ApiOperation({ summary: 'Get Blog by ID' })
    @ApiParam({ name: 'id', description: 'Blog id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: BlogDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Blog not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params,@Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {
        let obj = null;

        if (idlanguage == undefined) obj = await this.blogService.getById(params.id,CommonTools.populateObject(['values', 'idblogcategory','idlanguage']));
        else obj = await this.blogService.getById(params.id,CommonTools.populateObject(['values', 'idblogcategory','idlanguage','media']),idlanguage);
        // const obj = await this.blogValueService.findByIdAndPopulate(params.id);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete Blog by ID' })
    @ApiParam({ name: 'id', description: 'Blog id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Blog not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.blogService.delete(params.id);
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

    @ApiOperation({ summary: 'Update Blog by ID' })
    @ApiParam({ name: 'id', description: 'Blog id', required: true })
    @ApiBody({ type: ResultBlogDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultBlogDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Blog not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(ResultBlogDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
        const obj = await this.blogService.save(body, params.id);

    //   const obj = await this.blogService.updateTypeWithLabel(params.id, body);

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
