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
import { FAQDto } from '../dto/faq.dto';
import { FAQService } from '../services/faq.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostFAQDto } from '../dto/postfaq.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import {CommonTools} from 'src/app/tools/commontools';
import { ResultFAQDto } from '../dto/resultfaq.dto';
import { FAQValueService } from '../services/faqvalue.service';

@ApiTags('admin/faq')
@Controller('admin/faq')
@UseGuards(GeneralAdminGuard)
export class AdminFAQController {
    constructor(
        private faqService: FAQService,
        private faqValueService: FAQValueService
    ) { }

    @ApiOperation({ summary: 'Add FAQ' })
    @ApiBody({ type: PostFAQDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultFAQDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostFAQDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
          const obj = await this.faqService.save(body);
        // const obj = await this.faqService.addTypeWithValue(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.BAD_REQUEST,
                MessageTypes.OBJECT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get FAQ list' })
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
          const obj = await this.faqService.getAll(req.requestList);
        // const obj = await this.faqValueService.getAllPopulate(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.faqService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
        );
    }

    @ApiOperation({ summary: 'Get FAQ by ID' })
    @ApiParam({ name: 'id', description: 'FAQ id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: FAQDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'FAQ not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params,@Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {
        let obj = null;  
        if (idlanguage == undefined) obj = await this.faqService.getById(params.id,CommonTools.populateObject());
        else obj = await this.faqService.getById(params.id,CommonTools.populateObject(),idlanguage);
        // const obj = await this.faqValueService.findByIdAndPopulate(params.id);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete FAQ by ID' })
    @ApiParam({ name: 'id', description: 'FAQ id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'FAQ not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.faqService.delete(params.id);
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

    @ApiOperation({ summary: 'Update FAQ by ID' })
    @ApiParam({ name: 'id', description: 'FAQ id', required: true })
    @ApiBody({ type: ResultFAQDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultFAQDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'FAQ not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(ResultFAQDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
        const obj = await this.faqService.save(body, params.id);

    //   const obj = await this.faqService.updateTypeWithLabel(params.id, body);

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
