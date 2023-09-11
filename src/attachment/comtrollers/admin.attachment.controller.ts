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
    UploadedFile,
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
import { AttachmentDto } from '../dto/attachment.dto';
import { AttachmentService } from '../services/attachment.service';
import ResultListDTO from 'src/app/dto/resultlist.dto';
import { ParseParamsList } from 'src/app/interceptors/parseparamslist.interceptor';
import { PostAttachmentDto } from '../dto/postattachment.dto';
import { PrepareObjectBody } from 'src/app/interceptors/prepareobjectbody.interceptor';
import { GeneralAdminGuard } from 'src/app/guards/generaladmin.guard';
import { CommonTools } from 'src/app/tools/commontools';
import { ResultAttachmentDto } from '../dto/resultattachment.dto';
import { AttachmentValueService } from '../services/attachmentvalue.service';
import { FileService } from 'src/file/services/file.service';
import { DiskType, StorageEntityType } from 'src/file/tools/disk';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('admin/attachment')
@Controller('admin/attachment')
@UseGuards(GeneralAdminGuard)
export class AdminAttachmentController {
    constructor(
        private attachmentService: AttachmentService,
        private attachmentValueService: AttachmentValueService,
    
    private fileService: FileService,
    ) { }

    @ApiOperation({ summary: 'Add Attachment' })
    @ApiBody({ type: PostAttachmentDto })
  // @ApiConsumes('application/json')
  @ApiConsumes('multipart/form-data')
    @ApiOkResponse({
        type: ResultAttachmentDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @Post('/')
  @UseInterceptors(FileInterceptor('files'))
    @UseInterceptors(new PrepareObjectBody(PostAttachmentDto))
  public async add(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: PostAttachmentDto,
    @Res() res,
  ): Promise<ResultObjectDTO> {    
      const fileInfo = await this.fileService.storeFileAndGetId(
          DiskType.public,
          StorageEntityType.attachment,
          body.parent + "/" + body.idparent,
          file,
        );
    
    const postObj:AttachmentDto =this.attachmentService.convertFromBody(body, fileInfo) as AttachmentDto;
        

        const obj = await this.attachmentService.save(postObj);
        


    if (obj == null) {
      return await ToolsGenerateResponse.getErrObject(
        res,
        HttpStatus.BAD_REQUEST,
        MessageTypes.OBJECT_FOUND,
      );
    }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Get Attachment list' })
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
        const obj = await this.attachmentService.getAll(req.requestList);
        // const obj = await this.attachmentValueService.getAllPopulate(req.requestList);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }
        const totalObjects = await this.attachmentService.getCount(
            req.requestList,
        );
        return await ToolsGenerateResponse.getOkList(
            res,
            obj,
            req.requestList,
            totalObjects,
        );
    }

    @ApiOperation({ summary: 'Get Attachment by ID' })
    @ApiParam({ name: 'id', description: 'Attachment id', required: true })
    @ApiQuery({ name: 'idlanguage', description: 'Language id', required: false })
    @ApiOkResponse({
        type: AttachmentDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Attachment not found',
    })
    @Get('/:id')
    public async get(@Res() res, @Param() params, @Query('idlanguage') idlanguage?: string): Promise<ResultObjectDTO> {
        let obj = null;
        if (idlanguage == undefined) obj = await this.attachmentService.getById(params.id, CommonTools.populateObject(['fileinfo', 'values', 'idlanguage']));
        else obj = await this.attachmentService.getById(params.id, CommonTools.populateObject(['fileinfo', 'values', 'idlanguage']), idlanguage);
        // const obj = await this.attachmentValueService.findByIdAndPopulate(params.id);

        if (obj == null) {
            return await ToolsGenerateResponse.getErrObject(
                res,
                HttpStatus.NOT_FOUND,
                MessageTypes.OBJECT_NOT_FOUND,
            );
        }

        return await ToolsGenerateResponse.getOkObject(res, obj);
    }

    @ApiOperation({ summary: 'Delete Attachment by ID' })
    @ApiParam({ name: 'id', description: 'Attachment id', required: true })
    @ApiOkResponse({
        type: ResultObjectDTO,
        description: 'Delete success',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Attachment not found',
    })
    @Delete('/:id')
    public async delete(@Res() res, @Param() params): Promise<ResultObjectDTO> {
        const obj = await this.attachmentService.delete(params.id);
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

    @ApiOperation({ summary: 'Update Attachment by ID' })
    @ApiParam({ name: 'id', description: 'Attachment id', required: true })
    @ApiBody({ type: ResultAttachmentDto })
    @ApiConsumes('application/json')
    @ApiOkResponse({
        type: ResultAttachmentDto,
        description: 'Special obj in type: ResultObjectDTO',
    })
    @ApiNotFoundResponse({
        type: ResultObjectDTO,
        description: 'Attachment not found',
    })
    @Put('/:id')
    @UseInterceptors(new PrepareObjectBody(ResultAttachmentDto))
    public async update(
        @Res() res,
        @Param() params,
        @Body() body,
    ): Promise<ResultObjectDTO> {
        const obj = await this.attachmentService.save(body, params.id);

        //   const obj = await this.attachmentService.updateTypeWithLabel(
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
