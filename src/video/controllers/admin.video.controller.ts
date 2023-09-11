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
import { VideoDto } from '../dto/video.dto';
import { VideoService } from '../services/video.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostVideoDto } from '../dto/postvideo.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { CommonTools } from 'src/app/tools/commontools';
import { ResultVideoDto } from '../dto/resultvideo.dto';
import { VideoValueService } from '../services/videovalue.service';
import { ParsedVideoDto } from '../dto/parsedvideo.dto';

@ApiTags('admin/video')
@Controller('admin/video')
@UseGuards(GeneralAdminGuard)
export class AdminVideoController {
    constructor(
        private videoService: VideoService,
        private videoValueService: VideoValueService
    ) { }

    @ApiOperation({ summary: 'Add Video' })
    @ApiBody({ type: PostVideoDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultVideoDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
    @UseInterceptors(new PrepareObjectBody(PostVideoDto))
    public async add(@Body() body, @Res() res): Promise<ResultObjectDTO> {

        const videolocation = (body.hasOwnProperty('videolocation')) ? body.videolocation : '';
        const videoInfo: ParsedVideoDto = await this.videoService.parseVideoUrl(videolocation);
        
        if (!videoInfo.videoid) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.BAD_REQUEST,
                MessageTypes.MESSAGE_ERROR,
            );
        }

        const postObj:VideoDto =this.videoService.convertFromBody(body, videoInfo) as VideoDto;
      
        const obj = await this.videoService.save(postObj);
        // const obj = await this.videoService.addTypeWithValue(body);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.BAD_REQUEST,
                MessageTypes.OBJECT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get Video list' })
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
        req.requestList.populate.addToPopulates(['values', 'allvalues']);
        const obj = await this.videoService.getAll(req.requestList);
        // const obj = await this.videoValueService.getAllPopulate(req.requestList);
        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.videoService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
        );
    }

    @ApiOperation({ summary: 'Get Video by ID' })
    @ApiParam({ name: 'id', description: 'Video id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: VideoDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Video not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params, @Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {
        let obj = null;
        if (idlanguage == undefined) obj = await this.videoService.getById(params.id, CommonTools.populateObject());
        else obj = await this.videoService.getById(params.id, CommonTools.populateObject(), idlanguage);
        // const obj = await this.videoValueService.findByIdAndPopulate(params.id);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete Video by ID' })
    @ApiParam({ name: 'id', description: 'Video id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Video not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.videoService.delete(params.id);
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

    @ApiOperation({ summary: 'Update Video by ID' })
    @ApiParam({ name: 'id', description: 'Video id', required: true })
    @ApiBody({ type: ResultVideoDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultVideoDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Video not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(ResultVideoDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
        const obj = await this.videoService.save(body, params.id);

        // const obj = await this.videoService.updateTypeWithLabel(params.id, body);

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
