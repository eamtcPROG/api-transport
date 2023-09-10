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
import { SiteConfigDto } from '../dto/siteconfig.dto';
import { SiteConfigService } from '../services/siteconfig.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostSiteConfigDto } from '../dto/postsiteconfig.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { CommonTools } from 'src/app/tools/commontools';


@ApiTags('siteconfig')
@Controller('siteconfig')
@UseGuards(GeneralAdminGuard)
export class SiteConfigController {
    constructor(
        private siteConfigService: SiteConfigService,

    ) { }

    @ApiOperation({ summary: 'Add SiteConfig' })
    @ApiBody({ type: PostSiteConfigDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: SiteConfigDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostSiteConfigDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {
        const obj = await this.siteConfigService.save(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.BAD_REQUEST,
                MessageTypes.OBJECT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

  

    @ApiOperation({ summary: 'Get SiteConfig list' })
    @ApiOkResponse({
        type: ResultListDTO,
        description: 'Result List in type: ResultListDTO',
    })
    @ApiQuery({
        name: 'page',
        type: 'integer',
        description: 'SiteConfig number, default: 1',
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

        const obj = await this.siteConfigService.getAll(req.requestList);
        // const obj = await this.siteConfigValueService.getAllPopulate(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.siteConfigService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
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
      const obj = await this.siteConfigService.getHash();
  
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

    @ApiOperation({ summary: 'Get SiteConfig by ID' })
    @ApiParam({ name: 'id', description: 'SiteConfig id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: SiteConfigDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'SiteConfig not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        let obj = null;


        obj = await this.siteConfigService.getById(params.id);
        // const obj = await this.siteConfigValueService.findByIdAndPopulate(params.id);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete SiteConfig by ID' })
    @ApiParam({ name: 'id', description: 'SiteConfig id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'SiteConfig not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.siteConfigService.delete(params.id);
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

    @ApiOperation({ summary: 'Update SiteConfig by ID' })
    @ApiParam({ name: 'id', description: 'SiteConfig id', required: true })
    @ApiBody({ type: SiteConfigDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: SiteConfigDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'SiteConfig not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(SiteConfigDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
        const obj = await this.siteConfigService.save(body, params.id);

        //   const obj = await this.siteConfigService.updateTypeWithLabel(params.id, body);

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
